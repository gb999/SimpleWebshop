/**
 * Represents the details of a customer's order.
 */
export interface OrderDetails {
    /**
     * The full name of the customer placing the order.
     */
    name: string;
  
    /**
     * The email address of the customer placing the order.
     */
    email: string;
  
    /**
     * The shipping address where the order should be delivered.
     */
    address: string;
  
    /**
     * The selected shipping method for the order (e.g., "Standard", "Express").
     */
    shippingMethod: string;
  }
  