import { Flower2, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">FloralArt</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Creăm aranjamente florale unice pentru fiecare moment special din viața ta.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Cumpără</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Buchete
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Ocazii Speciale
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Flori de Sezon
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Cadouri
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suport</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Despre Noi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Livrare
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Returnări
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Str. Florilor 123, București, România</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+40123456789" className="hover:text-foreground">
                  +40 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:contact@floralart.ro" className="hover:text-foreground">
                  contact@floralart.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 FloralArt. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
