import { useEffect, useState } from 'preact/hooks';
import './Catalog.less';
import { ProductCard } from './ProductCard';
import { Product } from '../../models/Product';
import { Box, CircularProgress, LinearProgress } from '@mui/material';

/**
 * Props for the Catalog component.
 */
interface CatalogProps {
  /**
   * Callback function to handle adding a product to the cart.
   * @param product The product to add.
   * @param quantity The quantity of the product to add.
   */
  onAddToCart: (product: Product, quantity: number) => void;
}

/**
 * Displays a catalog of products and handles expanding product cards for additional details.
 * Fetches products from an API and displays them in a list of ProductCard components.
 * Manages loading state and expanded card state.
 * 
 * @param onAddToCart Callback function to handle adding a product to the cart.
 */
export function Catalog({ onAddToCart }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);


  const html = document.documentElement;
  const body = document.body;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (expandedCard !== null) {
      html.classList.add('no-scroll');
      body.classList.add('no-scroll');
    } else {
      html.classList.remove('no-scroll');
      body.classList.remove('no-scroll');
    }
  }, [expandedCard]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>;
  }

  return (
    <div className="catalog">
      {expandedCard && <div className="product-overlay" onClick={() => setExpandedCard(null)} />}


      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isExpanded={product.id === expandedCard}
          onClick={() => product.id !== expandedCard && setExpandedCard(product.id)}
          onAddToCart={(product, quantity) => {
            onAddToCart(product, quantity);
            setExpandedCard(null); // Close expanded card after adding
          }}
          onClose={() => setExpandedCard(null)}
        />
      ))}
    </div>
  );
}
