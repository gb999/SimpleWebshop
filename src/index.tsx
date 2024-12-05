import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './styles/index.less';
import { Catalog } from './components/Catalog/Catalog';
import { TopBar } from './components/TopBar/TopBar';
import { Cart } from './components/Cart/Cart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCart } from './hooks/useCart'; // Import the custom hook


/**
 * Main application component that manages the shopping cart, catalog, and user interactions.
 * 
 * This component utilizes a custom `useCart` hook for managing cart-related state and operations.
 * It includes a top bar, catalog, and a cart overlay. Additionally, it shows a success snackbar upon order completion.
 */
export function App() {
  const {cartItems, cartCount, handleAddToCart, handleRemoveItem, handleClearCart, handleUpdateQuantity } = useCart();
  const [cartVisible, setCartVisible] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false); // Snackbar state

  
  const handleOrderSuccess = () => {
    setOrderSuccess(true); 
    handleClearCart(); 
    setCartVisible(false); 
  };

  return (
    <>
      <TopBar
        cartCount={cartCount}
        onCartClick={() => setCartVisible(true)}
      />

      <Catalog onAddToCart={handleAddToCart} />

      {cartVisible && (
        <Cart
          items={cartItems}
          onClose={() => setCartVisible(false)}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCompleteOrder={handleOrderSuccess}
        />
      )}

      <Snackbar
        open={orderSuccess}
        autoHideDuration={5000}
        onClose={() => setOrderSuccess(false)} // Dismiss on close
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOrderSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

render(<App />, document.getElementById('app'));
