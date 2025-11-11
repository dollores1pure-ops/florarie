import { ShoppingCart, Flower2, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const navLinks = [
  { label: "Colecție Signature", href: "#colectie", testId: "link-bouquets" },
  { label: "Ocazii Speciale", href: "#ocazii", testId: "link-occasions" },
  { label: "Testimoniale", href: "#testimoniale", testId: "link-seasonal" },
  { label: "Despre Atelier", href: "#despre", testId: "link-about" },
];

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full shadow-sm shadow-primary/5">
      <div className="hidden md:block bg-gradient-to-r from-primary/90 via-primary to-rose-500 text-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-xs uppercase tracking-wide">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+40722222222" className="hover:underline">
                +40 722 222 222
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Livrare în aceeași zi în București & Ilfov
            </span>
          </div>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Atelier: Str. Florilor 123, București
          </span>
        </div>
      </div>

      <div className="backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white border-b border-primary/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
              <Flower2 className="h-6 w-6 text-primary" data-testid="icon-logo" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground leading-none" data-testid="text-brand">
                Maison de Fleurs
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.35em] mt-1">
                Atelier Floral de Lux
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                data-testid={link.testId}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors"
              onClick={onCartClick}
            >
              Comandă rapid
            </Button>

            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10"
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
        </div>
      </div>
    </header>
  );
}
