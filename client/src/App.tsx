import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import CheckoutForm, { type CheckoutFormData } from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import type { Product, CartItem } from "@shared/schema";

import springBouquet from "@assets/generated_images/Spring_bouquet_product_photo_264d785e.png";
import redRoses from "@assets/generated_images/Red_roses_bouquet_photo_99102b1e.png";
import colorfulMixed from "@assets/generated_images/Colorful_mixed_bouquet_photo_ca3fd406.png";
import whiteElegant from "@assets/generated_images/White_elegant_bouquet_photo_5af112fc.png";
import tropical from "@assets/generated_images/Tropical_bouquet_photo_a268ca88.png";

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Buchet Primăvară Veselă',
    description: 'Aranjament plin de viață cu trandafiri, lalele și verdeață proaspătă. Perfect pentru a aduce zâmbete și culoare în fiecare zi! 🌷',
    price: '159.99',
    image: springBouquet,
    category: 'Buchete',
  },
  {
    id: '2',
    name: 'Dragoste Eternă',
    description: 'Trandafiri roșii premium pentru a-ți exprima dragostea cea mai profundă. Fiecare petală spune "Te iubesc"! ❤️',
    price: '189.99',
    image: redRoses,
    category: 'Romantic',
  },
  {
    id: '3',
    name: 'Bucurie și Zâmbete',
    description: 'Combinație veselă de floarea-soarelui și margarete colorate care aduc optimism și bună dispoziție! ☀️',
    price: '129.99',
    image: colorfulMixed,
    category: 'Ocazii',
  },
  {
    id: '4',
    name: 'Puritate și Eleganță',
    description: 'Buchet alb rafinat cu trandafiri și crini, perfect pentru celebrări speciale și momente de neuitat. 🤍',
    price: '199.99',
    image: whiteElegant,
    category: 'Nuntă',
  },
  {
    id: '5',
    name: 'Pasiune Tropicală',
    description: 'Aranjament exotic care aduce căldură și emoție! Flori vibrante care fac inima să tresară! 🌺',
    price: '249.99',
    image: tropical,
    category: 'Premium',
  },
  {
    id: '6',
    name: 'Primăvară în Inimă',
    description: 'Versiunea deluxe a fericirii de primăvară, cu mai multe flori pentru mai multă dragoste! 💕',
    price: '179.99',
    image: springBouquet,
    category: 'Buchete',
  },
  {
    id: '7',
    name: 'Grădina Romantică',
    description: 'Buchet luxos de trandafiri în nuanțe de roz și roșu care exprimă admirație și afecțiune sinceră. 🌹',
    price: '219.99',
    image: redRoses,
    category: 'Romantic',
  },
  {
    id: '8',
    name: 'Razele Soarelui',
    description: 'Aranjament strălucitor cu flori galbene și portocalii care radiază energie pozitivă și bucurie! 🌻',
    price: '139.99',
    image: colorfulMixed,
    category: 'Sezon',
  },
];

function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = (formData: CheckoutFormData) => {
    console.log('Checkout submitted:', formData);
    console.log('Cart items:', cartItems);
    alert('Mulțumim pentru comanda ta! 💝 Florile tale speciale vor fi livrate cu dragoste!');
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (showCheckout) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
        <CheckoutForm
          cartItems={cartItems}
          onSubmit={handleCheckoutSubmit}
          onBack={() => setShowCheckout(false)}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <ProductGrid products={mockProducts} onAddToCart={addToCart} />
      </main>
      <Footer />
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="*" component={HomePage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
