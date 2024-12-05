import { useState } from 'preact/hooks';
import './QuantitySelector.less';
import { Add, Remove } from '@mui/icons-material';


/**
 * A component for selecting and updating a quantity with increment and decrement buttons.
 *
 * @param initialQuantity - The initial quantity to display. Defaults to 1.
 * @param onQuantityChange - A callback function that is invoked whenever the quantity changes.
 *                            Receives the updated quantity as its argument.
 *
 * @example
 * ```tsx
 * <QuantitySelector
 *   initialQuantity={2}
 *   onQuantityChange={(newQuantity) => console.log('Updated quantity:', newQuantity)}
 * />
 * ```
 */
export function QuantitySelector({
  initialQuantity = 1,
  onQuantityChange,
}: {
  initialQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      const newQuantity = Math.max(1, prev - 1);
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="quantity-selector">
      <button className="quantity-btn icon-button" onClick={decrement}>
        <Remove />
      </button>
      <span className="quantity">{quantity}</span>
      <button className="quantity-btn icon-button " onClick={increment}>
        <Add/>
      </button>
    </div>
  );
}
