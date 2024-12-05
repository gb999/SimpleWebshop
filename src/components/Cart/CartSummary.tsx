/**
 * A component that displays the total price of items in the cart.
 * 
 * @param {Object} props - The properties for the CartSummary component.
 * @param {number} props.total - The total amount of the cart.
 * 
 * @returns {JSX.Element} The rendered component displaying the total price.
 * 
 * @example
 * ```tsx
 * <CartSummary total={200.99} />
 * ```
 */
export function CartSummary({ total }: { total: number }) {
    return (
      <div className="cart-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    );
  }
  