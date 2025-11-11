import ProductGrid from '../ProductGrid';
import springBouquet from '@assets/generated_images/Spring_bouquet_product_photo_264d785e.png';
import redRoses from '@assets/generated_images/Red_roses_bouquet_photo_99102b1e.png';
import colorfulMixed from '@assets/generated_images/Colorful_mixed_bouquet_photo_ca3fd406.png';
import whiteElegant from '@assets/generated_images/White_elegant_bouquet_photo_5af112fc.png';

export default function ProductGridExample() {
  const mockProducts = [
    {
      id: '1',
      name: 'Buchet Primăvară',
      description: 'Aranjament colorat cu trandafiri, lalele și verdeață',
      price: '159.99',
      image: springBouquet,
      category: 'Buchete',
    },
    {
      id: '2',
      name: 'Trandafiri Roșii',
      description: 'Elegant buchet de trandafiri roșii premium',
      price: '189.99',
      image: redRoses,
      category: 'Romantic',
    },
    {
      id: '3',
      name: 'Mix Colorat',
      description: 'Combinație veselă de floarea-soarelui și margarete',
      price: '129.99',
      image: colorfulMixed,
      category: 'Ocazii',
    },
    {
      id: '4',
      name: 'Eleganță Albă',
      description: 'Rafinat buchet alb pentru evenimente speciale',
      price: '199.99',
      image: whiteElegant,
      category: 'Nuntă',
    },
  ];

  return (
    <ProductGrid 
      products={mockProducts} 
      onAddToCart={(p) => console.log('Added to cart:', p.name)} 
    />
  );
}
