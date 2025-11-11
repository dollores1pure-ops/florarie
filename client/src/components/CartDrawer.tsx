import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@shared/schema";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

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
    0
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col" data-testid="drawer-cart">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl" data-testid="text-cart-title">Coșul Tău</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center" data-testid="empty-cart-state">
              <p className="text-muted-foreground mb-4">Coșul tău este gol</p>
              <Button onClick={onClose} data-testid="button-continue-shopping">
                Continuă cumpărăturile
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-md border"
                  data-testid={`cart-item-${item.product.id}`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                    data-testid={`img-cart-item-${item.product.id}`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold" data-testid={`text-cart-item-name-${item.product.id}`}>
                        {item.product.name}
                      </h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => onRemoveItem(item.product.id)}
                        data-testid={`button-remove-${item.product.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-primary font-semibold mt-1" data-testid={`text-cart-item-price-${item.product.id}`}>
                      {item.product.price} RON
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center" data-testid={`text-quantity-${item.product.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span data-testid="text-total-label">Total:</span>
              <span className="text-primary" data-testid="text-total-amount">
                {total.toFixed(2)} RON
              </span>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={onCheckout}
              data-testid="button-checkout"
            >
              Finalizează Comanda
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
