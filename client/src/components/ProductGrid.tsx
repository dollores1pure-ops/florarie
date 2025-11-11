import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-section-title">
            Cele Mai Populare Buchete
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-section-subtitle">
            Descoperă aranjamentele noastre preferate, create cu pasiune și atenție la detalii
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
