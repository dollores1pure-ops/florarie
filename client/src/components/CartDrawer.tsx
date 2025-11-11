import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, Sparkles } from "lucide-react";
import type { CartItem } from "@shared/schema";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const ronFormatter = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  minimumFractionDigits: 2,
});

export default function CartDrawer({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg" data-testid="drawer-cart">
        <SheetHeader className="border-b border-primary/10 pb-4">
          <SheetTitle className="font-serif text-2xl flex items-center gap-2" data-testid="text-cart-title">
            <Sparkles className="h-5 w-5 text-primary" />
            Coșul tău Maison de Fleurs
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center gap-3" data-testid="empty-cart-state">
              <p className="text-muted-foreground">Coșul tău este gol. Adaugă buchetele preferate pentru a continua.</p>
              <Button onClick={onClose} variant="outline" className="rounded-full px-6" data-testid="button-continue-shopping">
                Explorează colecția
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-2xl border border-primary/10 bg-white/60 p-4 shadow-sm shadow-primary/10"
                  data-testid={`cart-item-${item.product.id}`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-xl object-cover ring-1 ring-primary/20"
                    data-testid={`img-cart-item-${item.product.id}`}
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-lg font-semibold" data-testid={`text-cart-item-name-${item.product.id}`}>
                          {item.product.name}
                        </h4>
                        <p className="text-xs uppercase tracking-wide text-primary font-semibold" data-testid={`text-cart-item-price-${item.product.id}`}>
                          {ronFormatter.format(parseFloat(item.product.price))}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full hover:bg-primary/10"
                        onClick={() => onRemoveItem(item.product.id)}
                        data-testid={`button-remove-${item.product.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold" data-testid={`text-quantity-${item.product.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t border-primary/10 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span data-testid="text-total-label">Total comandă</span>
              <span className="text-primary" data-testid="text-total-amount">
                {ronFormatter.format(total)}
              </span>
            </div>
            <Button
              size="lg"
              className="w-full rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/40"
              onClick={onCheckout}
              data-testid="button-checkout"
            >
              Finalizează comanda
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
