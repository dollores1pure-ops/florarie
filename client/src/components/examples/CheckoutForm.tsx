import CheckoutForm from '../CheckoutForm';
import springBouquet from '@assets/generated_images/Spring_bouquet_product_photo_264d785e.png';
import redRoses from '@assets/generated_images/Red_roses_bouquet_photo_99102b1e.png';

export default function CheckoutFormExample() {
  const mockCartItems = [
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
  ];

  return (
    <CheckoutForm
      cartItems={mockCartItems}
      onSubmit={(data) => console.log('Checkout submitted:', data)}
      onBack={() => console.log('Back to cart')}
    />
  );
}
