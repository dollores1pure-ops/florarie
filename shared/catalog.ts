import type { Product } from "./schema";

export const productsCatalog: Product[] = [
  {
    id: "regina-inimii",
    name: "Regina Inimii",
    description:
      "Un aranjament spectaculos cu trandafiri roșii de catifea, încoronat cu o diademă strălucitoare și mesajul „Te-am ales pentru o viață!”. Perfect pentru declarații de dragoste regale.",
    price: "749.00",
    image: "/products/regina-inimii.png",
    category: "Signature",
  },
  {
    id: "scarlet-confession",
    name: "Confesiune Scarlet",
    description:
      "Buchet compact din trandafiri roșii, cu detalii de cristale și o inimă albă centrală. Ideal pentru momente intime în care spui „Te iubesc” cu emoție.",
    price: "249.00",
    image: "/products/confesiune-scarlet.png",
    category: "Romantic",
  },
  {
    id: "simfonie-roz",
    name: "Simfonie Roz",
    description:
      "Armonie grațioasă de trandafiri fuchsia și albi, îmbrăcați în straturi delicate de voal. Panglica „Te iubesc!” transformă buchetul într-o promisiune a iubirii nepieritoare.",
    price: "499.00",
    image: "/products/simfonie-roz.png",
    category: "Romantic",
  },
  {
    id: "albastru-imperial",
    name: "Albastru Imperial",
    description:
      "Trandafiri safir cu accente de cristale, îmbrățișați de tonuri albastre și un tiara argintie. Un gest nobil pentru persoana care îți guvernează inima.",
    price: "699.00",
    image: "/products/albastru-imperial.png",
    category: "Signature",
  },
  {
    id: "iarta-ma-pui",
    name: "Iartă-mă, Pui",
    description:
      "Trandafiri fuchsia cu sclipiri discrete, purtând mesajul sincer „Iartă-mă, pui!”. Un buchet vibrant pentru împăcare din toată inima.",
    price: "389.00",
    image: "/products/iarta-ma-pui.png",
    category: "Reconciliation",
  },
  {
    id: "lavanda-de-vis",
    name: "Lavandă de Vis",
    description:
      "Culori pastelate de lavandă și crem, echilibrate într-un buchet de poveste cu trandafiri mătăsoși și perlute discrete. Ideal pentru momente tandre și aniversări elegante.",
    price: "439.00",
    image: "/products/lavanda-de-vis.png",
    category: "Elegance",
  },
];

export function findProductById(productId: string): Product | undefined {
  return productsCatalog.find((product) => product.id === productId);
}
