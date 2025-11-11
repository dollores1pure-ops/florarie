import { ShoppingCart, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Flower2 className="h-6 w-6 text-primary" data-testid="icon-logo" />
          <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-brand">
            FloralArt
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-bouquets">
            Buchete
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-occasions">
            Ocazii
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-seasonal">
            Sezon
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-about">
            Despre
          </a>
        </nav>

        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            onClick={onCartClick}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          {cartItemsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              data-testid="badge-cart-count"
            >
              {cartItemsCount}
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}
