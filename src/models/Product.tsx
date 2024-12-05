/**
 * Represents a product in the catalog.
 */
export interface Product {
    /**
     * A unique identifier for the product.
     */
    id: number;
  
    /**
     * The title or name of the product.
     */
    title: string;
  
    /**
     * The price of the product in the relevant currency.
     */
    price: number;
  
    /**
     * The category to which the product belongs.
     */
    category: string;
  
    /**
     * A detailed description of the product.
     */
    description: string;
  
    /**
     * A URL to an image representing the product.
     */
    image: string;
  }
  