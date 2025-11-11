import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Hero_floral_arrangement_36b60852.png";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-white to-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-1/2 w-[120vw] -translate-x-1/2 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:px-8 lg:py-28">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" />
            Atelier floral boutique
          </span>
          <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl" data-testid="text-hero-title">
            Buchete regale create pentru momente de neuitat
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl" data-testid="text-hero-subtitle">
            Fiecare aranjament este lucrat manual în atelierul nostru din București, cu trandafiri luxuriant parfumați,
            cristale discrete și panglici personalizate pentru declarații memorabile.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base shadow-lg shadow-primary/30 hover:shadow-primary/40"
              data-testid="button-shop-now"
            >
              <a href="#colectie">Descoperă colecția</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white px-8 text-base"
              data-testid="button-view-collection"
            >
              <a href="tel:+40722222222">Consultant floral</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 bg-white/70 p-4 shadow-sm shadow-primary/10 backdrop-blur">
              <h3 className="font-serif text-xl font-semibold text-primary">Livrare în aceeași zi</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Echipa noastră livrează personal în București și Ilfov, cu mesajul tău scris de mână.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-white/70 p-4 shadow-sm shadow-primary/10 backdrop-blur">
              <h3 className="font-serif text-xl font-semibold text-primary">Design garantat</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Selectăm trandafiri premium și accesorii couture pentru fiecare aranjament comandat.
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative rounded-[3rem] border border-white/40 bg-white/70 p-6 shadow-2xl shadow-primary/30 backdrop-blur-lg">
            <div className="overflow-hidden rounded-[2.5rem]">
              <img
                src={heroImage}
                alt="Aranjament floral regal"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 w-[80%] -translate-x-1/2 rounded-2xl border border-primary/20 bg-white/90 p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-foreground">Regina Inimii</h4>
                  <p className="text-sm text-muted-foreground">
                    Bestseller-ul nostru cu tiară și mesaj personalizat, creat pentru declarații grandioase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
