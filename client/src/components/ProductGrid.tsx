import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function ProductGrid({
  products,
  onAddToCart,
  isLoading = false,
  error,
  onRetry,
}: ProductGridProps) {
  const showEmptyState = !isLoading && !error && products.length === 0;

  return (
    <section id="colectie" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,228,235,0.5),_transparent_55%)]" />
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-section-title">
            Buchete Create cu Iubire 💐
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-section-subtitle">
            Fiecare aranjament este lucrat manual, cu trandafiri selecți și detalii strălucitoare pentru momente de poveste.
          </p>
        </div>

        {error ? (
          <Alert variant="destructive" className="max-w-xl mx-auto text-left">
            <AlertTitle>Nu am putut încărca produsele</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>{error}</p>
              {onRetry && (
                <Button variant="outline" onClick={onRetry}>
                  Reîncearcă
                </Button>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="rounded-3xl border bg-white/70 p-4 shadow-md">
                    <Skeleton className="aspect-square rounded-2xl mb-4" />
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-9 w-28" />
                    </div>
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
          </div>
        )}

        {showEmptyState && (
          <div className="mt-12 text-center text-muted-foreground">
            Momentan nu sunt produse disponibile. Revino în curând pentru noi surprize florale.
          </div>
        )}
      </div>
    </section>
  );
}
