import './CartActions.less';
import { RemoveShoppingCart } from "@mui/icons-material";



/**
 * Props for the CartActions component.
 */
interface CartActionsProps {
    /**
     * Function to clear the cart.
     */
    onClearCart: () => void;

    /**
     * Function to proceed to the checkout process.
     */
    onProceedToCheckout: () => void;
}


/**
 * A component for displaying cart action buttons such as clearing the cart 
 * and proceeding to checkout.
 * 
 * ### Example Usage:
 * ```tsx
 * import { CartActions } from './CartActions';
 * 
 * const handleClearCart = () => {
 *   console.log('Cart cleared');
 * };
 * 
 * const handleProceedToCheckout = () => {
 *   console.log('Proceeding to checkout');
 * };
 * 
 * <CartActions
 *   onClearCart={handleClearCart}
 *   onProceedToCheckout={handleProceedToCheckout}
 * />
 * ```
 */
export function CartActions({
    onClearCart,
    onProceedToCheckout,
}: CartActionsProps) {
    return (
        <div className="cart-actions">
            <button className="clear-cart icon-button" onClick={onClearCart}>
                <RemoveShoppingCart />Clear Cart
            </button>
            <button className="checkout-button" onClick={onProceedToCheckout}>
                Proceed to Checkout
            </button>
        </div>
    );
}
