import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Hero_floral_arrangement_36b60852.png";

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>

      <div className="relative container mx-auto h-full flex items-center px-4 md:px-8">
        <div className="max-w-2xl text-white">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4" data-testid="text-hero-title">
            Flori cu Dragoste pentru Sufletul Tău ❤️
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90" data-testid="text-hero-subtitle">
            Fiecare buchet este creat cu pasiune și grijă, pentru a aduce zâmbete și să celebreze momentele tale speciale.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="default"
              className="text-base"
              data-testid="button-shop-now"
            >
              Cumpără Acum
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-view-collection"
            >
              Vezi Colecția
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
