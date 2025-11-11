import ProductCard from '../ProductCard';
import springBouquet from '@assets/generated_images/Spring_bouquet_product_photo_264d785e.png';

export default function ProductCardExample() {
  const mockProduct = {
    id: '1',
    name: 'Buchet Primăvară',
    description: 'Aranjament colorat cu trandafiri, lalele și verdeață proaspătă',
    price: '159.99',
    image: springBouquet,
    category: 'Buchete',
  };

  return (
    <div className="w-72">
      <ProductCard 
        product={mockProduct} 
        onAddToCart={(p) => console.log('Added to cart:', p.name)} 
      />
    </div>
  );
}
