import Header from '../Header';

export default function HeaderExample() {
  return <Header cartItemsCount={3} onCartClick={() => console.log('Cart clicked')} />;
}
