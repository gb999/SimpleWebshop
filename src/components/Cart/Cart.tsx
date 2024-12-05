import './Cart.less';
import { CartItemComponent } from './CartItemComponent';
import { CartActions } from './CartActions';
import { CartSummary } from './CartSummary';
import { Checkout } from './Checkout';
import { useState } from 'preact/hooks';
import { CartItem } from '../../models/CartItem';
import { ArrowBack, Close } from '@mui/icons-material';

/**
 * Props for the Cart component.
 */
interface CartProps {
  /**
   * List of items in the cart.
   * @type {CartItem[]}
   */
  items: CartItem[];

  /**
   * Function to close the cart.
   */
  onClose: () => void;

  /**
   * Function to remove an item from the cart.
   * @param id The ID of the item to remove.
   */
  onRemoveItem: (id: number) => void;

  /**
   * Function to clear the entire cart.
   */
  onClearCart: () => void;

  /**
   * Function to update the quantity of an item in the cart.
   * @param id The ID of the item to update.
   * @param quantity The new quantity of the item.
   */
  onUpdateQuantity: (id: number, quantity: number) => void;

  /**
   * Function to complete the order.
   * @param orderDetails The details of the completed order.
   */
  onCompleteOrder: (orderDetails: any) => void;
}


/**
 * A component for displaying the shopping cart with functionality to manage cart items, 
 * proceed to checkout, remove items, and view the cart summary.
 */
export function Cart({
  items,
  onClose,
  onRemoveItem,
  onClearCart,
  onUpdateQuantity,
  onCompleteOrder,
}: CartProps) {
  
  const calculateTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <button className="close-cart" onClick={onClose}>
          <Close />
        </button>

        {isCheckout ? (
          <>
            <button className="back-to-cart icon-button" onClick={() => setIsCheckout(false)}>
              <ArrowBack />Back to Cart
            </button>
            <Checkout
              onCompleteOrder={(orderDetails) => {
                onCompleteOrder(orderDetails);
                onClose();
              }}
            />
            <CartSummary total={calculateTotalPrice()} />
          </>
        ) : items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <h2>Your Cart</h2>
            <div className="cart-items">
              {items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onRemove={onRemoveItem}
                  onQuantityChange={(quantity) =>
                    onUpdateQuantity(item.id, quantity)
                  }
                />
              ))}
            </div>

            <CartActions
              onClearCart={onClearCart}
              onProceedToCheckout={() => setIsCheckout(true)}
            />
            <CartSummary total={calculateTotalPrice()} />
          </>
        )}
      </div>
    </div>
  );
}
