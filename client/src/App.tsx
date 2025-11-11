import { useEffect, useState } from "react";
import { Switch, Route, useLocation, useRoute } from "wouter";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import CheckoutForm, { type CheckoutFormData } from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import NotFoundPage from "@/pages/not-found";
import type { Product, CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProductsResponse = {
  products: Product[];
};

type StripeConfigResponse = {
  publishableKey: string | null;
};

const RON_FORMATTER = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  minimumFractionDigits: 2,
});

const PENDING_ORDER_STORAGE_KEY = "maison-de-fleurs-pending-order";

type PendingOrder = {
  cartItems: CartItem[];
  customer: CheckoutFormData;
  total: number;
  sessionId: string;
  createdAt: string;
};

function savePendingOrder(order: PendingOrder) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PENDING_ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.error("Nu am putut salva comanda în așteptare.", error);
  }
}

function loadPendingOrder(): PendingOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingOrder;
  } catch (error) {
    console.error("Nu am putut încărca comanda din stocare.", error);
    return null;
  }
}

function clearPendingOrder() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_ORDER_STORAGE_KEY);
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Nu am putut încărca colecția de produse.");
  }
  const data: ProductsResponse = await response.json();
  return data.products;
}

async function fetchStripeConfig(): Promise<string | null> {
  const response = await fetch("/api/config");
  if (!response.ok) {
    throw new Error("Nu am putut obține configurația Stripe.");
  }
  const data: StripeConfigResponse = await response.json();
  return data.publishableKey;
}

function HomePage() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);

  const [, navigate] = useLocation();
  const [isCheckoutRoute] = useRoute("/checkout");
  const [isSuccessRoute] = useRoute("/checkout/succes");
  const [isCancelRoute] = useRoute("/checkout/anulat");

  const {
    data: products = [],
    isPending: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    data: publishableKey,
    error: stripeError,
    isPending: stripeLoading,
    refetch: refetchStripeConfig,
  } = useQuery({
    queryKey: ["stripe-config"],
    queryFn: fetchStripeConfig,
  });

  const isStripeReady = !stripeError && publishableKey !== null;

  useEffect(() => {
    if (isSuccessRoute) {
      setIsCartOpen(false);
      const stored = loadPendingOrder();
      if (stored) {
        setPendingOrder(stored);
      } else {
        setPendingOrder(null);
      }
      setCartItems([]);
      clearPendingOrder();
    }
  }, [isSuccessRoute]);

  useEffect(() => {
    if (isCancelRoute) {
      const stored = loadPendingOrder();
      if (stored) {
        setPendingOrder(stored);
        setCartItems(stored.cartItems);
        setIsCartOpen(true);
        toast({
          title: "Plata a fost anulată",
          description: "Produsele tale au rămas în coș.",
        });
      } else {
        setIsCartOpen(false);
      }
    }
  }, [isCancelRoute, toast]);

  useEffect(() => {
    if (isCheckoutRoute) {
      setIsCartOpen(false);
    }
    if (!isCheckoutRoute) {
      setCheckoutError(null);
      setIsRedirecting(false);
    }
  }, [isCheckoutRoute]);

  const addToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });

    setIsCartOpen(true);
    toast({
      title: "Adăugat în coș",
      description: `${product.name} a fost adăugat în coș.`,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adaugă mai întâi florile preferate pentru a continua.",
        variant: "destructive",
      });
      return;
    }

    navigate("/checkout");
  };

  const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
    if (cartItems.length === 0) {
      setCheckoutError("Coșul este gol. Adaugă produse și reîncearcă.");
      return;
    }

    const orderTotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0,
    );

    setCheckoutError(null);
    setIsRedirecting(true);

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          customer: {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone,
            address: formData.deliveryAddress,
            deliveryDate: formData.deliveryDate,
            message: formData.giftMessage ?? "",
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
          (errorBody && (errorBody.message as string)) ||
          "Nu am putut iniția plata. Te rugăm să încerci din nou.";
        throw new Error(message);
      }

      const { sessionId, url } = (await response.json()) as {
        sessionId: string;
        url?: string | null;
      };

      const orderRecord: PendingOrder = {
        cartItems,
        customer: formData,
        total: orderTotal,
        sessionId,
        createdAt: new Date().toISOString(),
      };

      savePendingOrder(orderRecord);
      setPendingOrder(orderRecord);
      setCartItems([]);
      setIsCartOpen(false);

      if (url) {
        window.location.href = url;
        return;
      }

      throw new Error("Nu am putut obține adresa de redirecționare către Stripe.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "A apărut o eroare neașteptată.";
      setCheckoutError(message);
      toast({
        title: "Plata nu a pornit",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsRedirecting(false);
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isSuccessRoute) {
    const customerName = pendingOrder?.customer.customerName?.split(" ")[0];
    const deliveryDate =
      pendingOrder?.customer.deliveryDate &&
      new Date(pendingOrder.customer.deliveryDate).toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
        <Header cartItemsCount={0} onCartClick={() => navigate("/")} />
        <main className="flex-1 container mx-auto px-4 md:px-8 py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-4xl font-semibold md:text-5xl">
              Mulțumim pentru comanda ta, {customerName ?? "dragă client"}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Ți-am trimis un email de confirmare. Florarii noștri pregătesc deja aranjamentul pentru livrare
              {deliveryDate ? ` în data de ${deliveryDate}` : ""}.
            </p>
            {pendingOrder ? (
              <div className="space-y-4 rounded-3xl border border-primary/10 bg-white/80 p-6 text-left shadow-lg shadow-primary/10">
                <div className="flex items-center justify-between border-b pb-3 text-sm text-muted-foreground">
                  <span>Comanda #{pendingOrder.sessionId.slice(-8).toUpperCase()}</span>
                  <span>
                    {new Date(pendingOrder.createdAt).toLocaleString("ro-RO", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="space-y-3">
                  {pendingOrder.cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-foreground">{item.product.name}</p>
                        <p className="text-muted-foreground">Cantitate: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-primary">
                        {RON_FORMATTER.format(parseFloat(item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {RON_FORMATTER.format(pendingOrder.total)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Nu am găsit detalii despre ultima comandă, însă echipa noastră te va contacta pentru confirmare.
              </p>
            )}
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button className="rounded-full px-8" onClick={() => navigate("/")}>
                Înapoi la colecție
              </Button>
              <Button variant="outline" className="rounded-full px-8" asChild>
                <a href="tel:+40722222222">Contact rapid</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isCheckoutRoute) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-rose-50 via-white to-white">
        <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-1">
          <CheckoutForm
            cartItems={cartItems}
            onSubmit={handleCheckoutSubmit}
            onBack={() => {
              navigate("/");
              setIsCartOpen(true);
            }}
            isSubmitting={isRedirecting}
            errorMessage={checkoutError}
            isStripeReady={isStripeReady}
          />
        </main>
        <Footer />
        <CartDrawer
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
        />
      </div>
    );
  }

  if (isCancelRoute) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-rose-50 via-white to-white">
        <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-1 container mx-auto px-4 md:px-8 py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <XCircle className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-4xl font-semibold md:text-5xl">
              Plata a fost anulată
            </h1>
            <p className="text-lg text-muted-foreground">
              Nu este nicio problemă — coșul tău a rămas neschimbat și poți relua finalizarea comenzii oricând ești gata.
            </p>
            <div className="space-y-4 rounded-3xl border border-primary/10 bg-white/80 p-6 text-left shadow-lg shadow-primary/10">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Coșul este gol în acest moment.
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-foreground">{item.product.name}</p>
                        <p className="text-muted-foreground">Cantitate: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-primary">
                        {RON_FORMATTER.format(parseFloat(item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="text-lg font-semibold">Total estimat</span>
                    <span className="text-lg font-bold text-primary">
                      {RON_FORMATTER.format(
                        cartItems.reduce(
                          (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button className="rounded-full px-8" onClick={() => navigate("/checkout")}>
                Reia finalizarea
              </Button>
              <Button variant="outline" className="rounded-full px-8" onClick={() => navigate("/")}>
                Înapoi la colecție
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <CartDrawer
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
        />
      </div>
    );
  }

  const productsErrorMessage = productsError instanceof Error ? productsError.message : null;
  const stripeErrorMessage = stripeError instanceof Error ? stripeError.message : null;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-rose-50 via-white to-white">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-1">
        <Hero />
        {stripeErrorMessage && (
          <div className="container mx-auto px-4 md:px-8">
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              {stripeErrorMessage}
            </div>
          </div>
        )}
        <ProductGrid
          products={products}
          onAddToCart={addToCart}
          isLoading={productsLoading}
          error={productsErrorMessage}
          onRetry={() => {
            refetchProducts();
            refetchStripeConfig();
          }}
        />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-8 rounded-3xl border border-primary/10 bg-white/70 p-10 shadow-2xl shadow-primary/10 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-serif text-3xl font-semibold">
                  Livrare personalizată și atenție la detalii
                </h3>
                <p className="text-muted-foreground">
                  Maison de Fleurs înseamnă artă și emoție. Fiecare buchet este creat cu grijă, iar livrarea este asigurată de florarii noștri, pentru ca experiența să fie completă.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm">
                  <p className="font-semibold text-primary">Program flexibil</p>
                  <p className="text-muted-foreground">Livrăm zilnic, inclusiv în weekend, între orele 09:00 - 21:00.</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm">
                  <p className="font-semibold text-primary">Garanție de prospețime</p>
                  <p className="text-muted-foreground">Selecționăm cele mai proaspete flori și oferim îngrijire premium.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150}>
        <Switch>
          <Route path="/checkout/succes" component={HomePage} />
          <Route path="/checkout/anulat" component={HomePage} />
          <Route path="/checkout" component={HomePage} />
          <Route path="/" component={HomePage} />
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;