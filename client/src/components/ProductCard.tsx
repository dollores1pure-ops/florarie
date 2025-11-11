import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ronFormatter = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  minimumFractionDigits: 2,
});

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formattedPrice = ronFormatter.format(parseFloat(product.price));

  return (
    <Card
      className="group relative overflow-hidden rounded-3xl border-0 bg-white shadow-xl shadow-primary/10 transition-transform hover:-translate-y-2"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-product-${product.id}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
        <Badge variant="secondary" className="absolute top-4 left-4 bg-white/90 text-primary font-semibold px-3 py-1">
          {product.category}
        </Badge>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div>
          <h3
            className="font-serif text-2xl font-semibold text-foreground mb-2"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p
            className="text-sm text-muted-foreground leading-relaxed line-clamp-3"
            data-testid={`text-product-description-${product.id}`}
          >
            {product.description}
          </p>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
              {formattedPrice}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              preț per aranjament
            </span>
          </div>
          <Button
            size="lg"
            className="rounded-full px-6 bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/40"
            onClick={() => onAddToCart(product)}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <Heart className="h-4 w-4 mr-2 fill-current" />
            Adaugă în coș
          </Button>
        </div>
      </div>
    </Card>
  );
}
