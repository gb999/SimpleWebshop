import { useEffect, useState } from 'preact/hooks';
import './Checkout.less';
import { OrderDetails } from '../../models/OrderDetails';
import { TextField, Button, InputAdornment, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Person, Email, Home } from '@mui/icons-material';

/**
 * Interface for the Checkout component props.
 * 
 * @interface CheckoutProps
 * @property {Function} onCompleteOrder - The callback to be triggered when the order is completed.
 */
interface CheckoutProps {
  onCompleteOrder: (orderDetails: { orderDetails: OrderDetails }) => void;
}

/**
 * A component for the checkout process where users enter their order details and complete the order.
 * 
 * @returns {JSX.Element} The rendered Checkout form for order details.
 * 
 * @example
 * ```tsx
 * <Checkout 
 *   onCompleteOrder={(orderDetails) => handleCompleteOrder(orderDetails)} 
 * />
 * ```
 */
export function Checkout({ onCompleteOrder } : CheckoutProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '',
    email: '',
    address: '',
    shippingMethod: ''
  });

  // Load customer info from sessionStorage
  useEffect(() => {
    const storedInfo = sessionStorage.getItem('orderDetails');
    if (storedInfo) { 
      setOrderDetails(JSON.parse(storedInfo));
    }
  }, []);

  // Update sessionStorage whenever orderDetails changes
  useEffect(() => {
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  }, [orderDetails]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onCompleteOrder({ orderDetails: orderDetails });
    sessionStorage.removeItem('orderDetails'); // clear session storage
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleFormSubmit} className="checkout-form">
        <div className="form-group">
          <TextField
            id="name"
            label="Name"
            value={orderDetails.name}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, name: e.currentTarget.value })
            }
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            id="email"
            label="Email"
            value={orderDetails.email}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, email: e.currentTarget.value })
            }
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            id="address"
            label="Address"
            value={orderDetails.address}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, address: e.currentTarget.value })
            }
            required
            fullWidth
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="form-group">
          <FormControl fullWidth>
            <InputLabel id="shipping-label">Shipping Method</InputLabel>
            <Select
              labelId="shipping-label"
              id="shipping"
              value={orderDetails.shippingMethod}
              onChange={(e: SelectChangeEvent) =>
                setOrderDetails({ ...orderDetails, shippingMethod: (e.target as HTMLSelectElement).value }) // type assertion
              }
              label="Shipping Method"
              required
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="standard">Standard Shipping</MenuItem>
              <MenuItem value="express">Express Shipping</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button type="submit" variant="contained" color="primary" className="complete-button">
          Complete Order
        </Button>
      </form>
    </div>
  );
}
