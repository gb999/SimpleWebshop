import { useState } from 'preact/hooks';
import './CartControls.less';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { QuantitySelector } from './QuantitySelector';


/**
 * A component that provides controls for managing quantity and adding items to the cart.
 *
 * @param onAddToCart - A callback function triggered when the "Add to Cart" button is clicked.
 *                      Receives the current quantity as its argument.
 *
 * @example
 * ```tsx
 * <CartControls
 *   onAddToCart={(quantity) => console.log(`Added ${quantity} items to the cart`)}
 * />
 * ```
 */
export function CartControls({ onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="cart-controls">
      <QuantitySelector initialQuantity={quantity} onQuantityChange={setQuantity} />
      <button className="add-to-cart icon-button"
        onClick={(evt) => {
          evt.stopPropagation(); // Prevent the click from reopening the card 
          onAddToCart(quantity);
        }}>
        <AddShoppingCartIcon /> Add to Cart 
      </button>
    </div>
  );
}
