import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { z } from "zod";
import { productsCatalog, findProductById } from "@shared/catalog";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-10-29.clover",
    })
  : undefined;

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(5),
    address: z.string().min(5),
    deliveryDate: z.string().optional(),
    message: z.string().optional(),
  }),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

function getStripeOrThrow(): Stripe {
  if (!stripe) {
    throw Object.assign(new Error("Stripe nu este configurat. Setează variabila STRIPE_SECRET_KEY."), {
      status: 500,
    });
  }

  return stripe;
}

function getOrigin(req: Request): string {
  const headerOrigin = (req.headers.origin ?? req.headers.referer) as string | undefined;
  if (headerOrigin) {
    return headerOrigin.replace(/\/$/, "");
  }
  return process.env.APP_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:5000";
}

export async function registerRoutes(app: Express): Promise<Server> {
  const api = express.Router();

  api.get("/products", (_req, res: Response) => {
    res.json({ products: productsCatalog });
  });

  api.get("/config", (_req, res: Response) => {
    res.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? null,
    });
  });

  api.post("/checkout/session", async (req: Request, res: Response) => {
    const parseResult = checkoutSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Datele trimise nu sunt valide.",
        errors: parseResult.error.flatten(),
      });
    }

    const { items, customer, successUrl, cancelUrl } = parseResult.data;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = findProductById(item.productId);
      if (!product) {
        return res.status(404).json({
          message: `Produsul cu id-ul ${item.productId} nu a fost găsit.`,
        });
      }

      const unitAmount = Math.round(parseFloat(product.price) * 100);
      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: "ron",
          unit_amount: unitAmount,
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image ? [`${getOrigin(req)}${product.image}`] : undefined,
          },
        },
      });
    }

    try {
      const stripeClient = getStripeOrThrow();
      const origin = getOrigin(req);
      const session = await stripeClient.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        customer_email: customer.email,
        success_url: successUrl ?? `${origin}/checkout/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl ?? `${origin}/checkout/anulat`,
        metadata: {
          customer_name: customer.name,
          customer_phone: customer.phone,
          delivery_address: customer.address,
          delivery_date: customer.deliveryDate ?? "",
          gift_message: customer.message ?? "",
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "A apărut o problemă la crearea sesiunii de plată.";
      res.status(500).json({ message });
    }
  });

  app.use("/api", api);

  const httpServer = createServer(app);
  return httpServer;
}
