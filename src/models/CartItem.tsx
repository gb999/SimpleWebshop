import { Product } from "./Product";
/**
 * Represents an item in the shopping cart.
 * Extends the Product interface to include a quantity property.
 * 
 * @extends Product
 */
export interface CartItem extends Product {
    /**
     * The number of units of the product in the cart.
     */
    quantity: number;
}
