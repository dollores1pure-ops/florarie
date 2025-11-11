import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";
import type { CartItem } from "@shared/schema";

interface CheckoutFormProps {
  cartItems: CartItem[];
  onSubmit: (formData: CheckoutFormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  isStripeReady?: boolean;
}

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDate: string;
  giftMessage?: string;
}

const ronFormatter = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  minimumFractionDigits: 2,
});

export default function CheckoutForm({
  cartItems,
  onSubmit,
  onBack,
  isSubmitting = false,
  errorMessage,
  isStripeReady = true,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryDate: "",
    giftMessage: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStripeReady || isSubmitting) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" data-testid="text-checkout-title">
          Ultimul Pas spre Fericire 💝
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Suntem aproape gata să livrăm florile tale speciale
        </p>

        {!isStripeReady && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertTitle>Verificăm configurarea plăților</AlertTitle>
            <AlertDescription>
              Încercăm să te redirecționăm către pagina securizată Stripe. Dacă nu se încarcă, te rugăm să ne contactezi
              telefonic pentru finalizarea comenzii.
            </AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="destructive" className="mb-6 border-destructive/40 bg-destructive/5">
            <AlertTitle>A apărut o eroare</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 shadow-lg shadow-primary/5">
                <h2 className="font-serif text-xl font-semibold mb-4" data-testid="text-contact-title">
                  Să Rămânem în Legătură ✉️
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nume Complet *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      data-testid="input-customer-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      data-testid="input-customer-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      data-testid="input-customer-phone"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg shadow-primary/5">
                <h2 className="font-serif text-xl font-semibold mb-4" data-testid="text-delivery-title">
                  Unde Să Aducem Bucuria? 🚚
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Adresă de Livrare *</Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      data-testid="input-delivery-address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Data Livrării *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      data-testid="input-delivery-date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Mesaj din Inimă 💌 (Opțional)</Label>
                    <Textarea
                      id="message"
                      value={formData.giftMessage}
                      onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                      placeholder="Scrie un mesaj personalizat plin de dragoste..."
                      data-testid="input-gift-message"
                    />
                  </div>
                </div>
              </Card>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1"
                    data-testid="button-back"
                  >
                    Înapoi
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                    data-testid="button-submit-order"
                  >
                    {isSubmitting ? "Se procesează..." : "Trimite cu Dragoste 💗"}
                  </Button>
                </div>
            </form>
          </div>

          <div>
            <Card className="p-6 sticky top-24 space-y-6 shadow-xl shadow-primary/10">
              <div>
                <h2 className="font-serif text-xl font-semibold mb-4" data-testid="text-order-summary">
                  Florile Tale Speciale 🌸
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3" data-testid={`order-item-${item.product.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md ring-1 ring-primary/20"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Cantitate: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {ronFormatter.format(parseFloat(item.product.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Subtotal:</span>
                      <span>{ronFormatter.format(total)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Livrare:</span>
                      <span className="text-accent-foreground">Gratuită</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-primary" data-testid="text-checkout-total">
                        {ronFormatter.format(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-primary/15 via-primary/10 to-accent/30 p-4 flex gap-3 items-start">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm text-primary">
                  Florarii noștri livrează personal în aceeași zi în București și Ilfov, cu atenție pentru fiecare detaliu și mesaj.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
