import { Flower2, Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

const atelierLinks = [
  { label: "Colecție Signature", href: "#colectie" },
  { label: "Buchete personalizate", href: "#ocazii" },
  { label: "Testimoniale", href: "#testimoniale" },
  { label: "Despre atelier", href: "#despre" },
];

const supportLinks = [
  { label: "Întrebări frecvente", href: "#" },
  { label: "Politică de livrare", href: "#" },
  { label: "Plată & securitate", href: "#" },
  { label: "Termeni & condiții", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-white via-rose-50 to-rose-100/60 border-t border-primary/10">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Flower2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-foreground">Maison de Fleurs</span>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">atelier floral</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cream emoții prin flori couture, personalizate pentru fiecare poveste de dragoste.
              Atelierul nostru livrează cu discreție și eleganță în București și împrejurimi.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-primary hover:bg-primary hover:text-white transition-colors"
                data-testid="link-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-primary hover:bg-primary hover:text-white transition-colors"
                data-testid="link-instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Colecții</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {atelierLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Suport</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Contact boutique</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span>Str. Florilor 123, București, România</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+40722222222" className="hover:text-primary">
                  +40 722 222 222
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:atelier@maisondfleurs.ro" className="hover:text-primary">
                  atelier@maisondfleurs.ro
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>Luni - Duminică: 08:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-primary/10 bg-white/70 p-6 text-center text-sm text-muted-foreground backdrop-blur">
          <p>&copy; {new Date().getFullYear()} Maison de Fleurs. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
