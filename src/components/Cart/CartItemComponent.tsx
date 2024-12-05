import './CartItemComponent.less';
import { Delete } from '@mui/icons-material';
import { QuantitySelector } from '../Shared/QuantitySelector';

/**
 * Represents a single cart item in the cart, displaying the product image,
 * title, quantity, and total price, along with options to change the quantity
 * and remove the item from the cart.
 * 
 * @example
 * ```tsx
 * const handleRemoveItem = (id: number) => { 
 *   console.log('Removing item with id:', id); 
 * };
 * const handleQuantityChange = (quantity: number) => { 
 *   console.log('New quantity:', quantity); 
 * };
 * 
 * <CartItemComponent 
 *   item={{ id: 1, image: 'path/to/image.jpg', title: 'Item Name', price: 10, quantity: 2 }} 
 *   onRemove={handleRemoveItem}
 *   onQuantityChange={handleQuantityChange}
 * />
 * ```
 */
interface CartItemComponentProps {
  /**
   * The item in the cart.
   */
  item: {
    /**
     * Unique identifier for the item.
     */
    id: number;

    /**
     * URL to the image of the item.
     */
    image: string;

    /**
     * Title or name of the item.
     */
    title: string;

    /**
     * Price per unit of the item.
     */
    price: number;

    /**
     * Quantity of the item in the cart.
     */
    quantity: number;
  };

  /**
   * Function to remove the item from the cart based on its id.
   */
  onRemove: (id: number) => void;

  /**
   * Function to handle quantity change for the item.
   */
  onQuantityChange: (quantity: number) => void;
}

/**
 * A component that displays a single cart item, allowing the user to modify 
 * the quantity or remove the item from the cart.
 * 
 * @param {CartItemComponentProps} props - The properties for the CartItemComponent.
 * @returns {JSX.Element} The rendered component.
 */
export function CartItemComponent({
  item,
  onRemove,
  onQuantityChange,
}: CartItemComponentProps) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <p>{item.title}</p>
        <QuantitySelector
          initialQuantity={item.quantity}
          onQuantityChange={onQuantityChange}
        />
        <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button className="remove-item icon-button" onClick={() => onRemove(item.id)}>
        <Delete /> 
      </button>
    </div>
  );
}
