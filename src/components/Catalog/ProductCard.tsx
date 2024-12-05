import { CartControls } from '../Shared/CartControls';
import { Product } from '../../models/Product';
import './ProductCard.less';
import CloseIcon from '@mui/icons-material/Close';

interface ProductCardProps {
  /**
   * The product data to display in the card.
   */
  product: Product;

  /**
   * Optional flag to control whether the card is expanded to show additional details
   * like the description and add-to-cart controls.
   * @default false
   */
  isExpanded?: boolean;

  /**
   * Optional callback function for when the card is clicked.
   */
  onClick?: () => void;

  /**
   * Optional callback for adding the product to the cart with a specified quantity.
   */
  onAddToCart?: (product: Product, quantity: number) => void;

  /**
   * Optional callback for closing the expanded view of the card.
   */
  onClose?: () => void;
}


/**
 * A card component for displaying a product's details, with optional expand functionality and cart controls.
 *
 * @param product - The product object containing details such as title, price, category, description, and image URL.
 * @param isExpanded - A boolean indicating whether the card is expanded to show additional details and controls. Defaults to `false`.
 * @param onClick - A callback function triggered when the card is clicked. Defaults to an empty function.
 * @param onAddToCart - A callback function triggered when a product is added to the cart. Receives the product and quantity as arguments. Defaults to an empty function.
 * @param onClose - A callback function triggered when the close button is clicked in the expanded view. Defaults to an empty function.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   product={{
 *     id: 1,
 *     title: "Sample Product",
 *     price: 19.99,
 *     category: "Category",
 *     description: "This is a sample product.",
 *     image: "https://example.com/sample-product.jpg",
 *   }}
 *   isExpanded={true}
 *   onClick={() => console.log("Card clicked!")}
 *   onAddToCart={(product, quantity) => console.log(`Added ${quantity} of ${product.title} to the cart.`)}
 *   onClose={() => console.log("Card closed!")}
 * />
 * ```
 */
export function ProductCard(
  {
    product,
    isExpanded = false,
    onClick = () => { },
    onAddToCart = (product: Product, quantity: number) => { },
    onClose = () => { }
  }: ProductCardProps) {
  return (
    <div className={`product-card ${isExpanded ? 'expanded' : ''}`} key={product.id} onClick={onClick}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="card-body">
        {isExpanded && (
          <button className="close-card" onClick={(evt) => { evt.stopPropagation(); onClose() }}><CloseIcon /></button>
        )}

        <div className="product-details">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
        </div>
        {isExpanded && <CartControls onAddToCart={(quantity) => onAddToCart(product, quantity)} />}
      </div>
    </div>
  );
}


