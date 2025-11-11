import { useState } from 'react';
import CartDrawer from '../CartDrawer';
import { Button } from '@/components/ui/button';
import springBouquet from '@assets/generated_images/Spring_bouquet_product_photo_264d785e.png';
import redRoses from '@assets/generated_images/Red_roses_bouquet_photo_99102b1e.png';

export default function CartDrawerExample() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      product: {
        id: '1',
        name: 'Buchet Primăvară',
        description: 'Aranjament colorat',
        price: '159.99',
        image: springBouquet,
        category: 'Buchete',
      },
      quantity: 2,
    },
    {
      product: {
        id: '2',
        name: 'Trandafiri Roșii',
        description: 'Elegant buchet',
        price: '189.99',
        image: redRoses,
        category: 'Romantic',
      },
      quantity: 1,
    },
  ]);

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Cart ({cartItems.length} items)</Button>
      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  );
}
