import { Book, Home, Info, Menu, MenuOpen, Phone, ShoppingCart } from '@mui/icons-material';
import './TopBar.less';
import { useState } from 'react';

interface TopBarProps {
  /**
   * The number of items currently in the cart.
   */
  cartCount: number;

  /**
   * A callback function to handle cart button clicks.
   */
  onCartClick: () => void;
}

/**
 * The `TopBar` component represents the navigation bar for the application.
 * It includes links to different sections, a cart button, and a responsive menu toggle.
 *
 * @param {TopBarProps} props - The props for the component.
 * @returns The rendered navigation bar component.
 */
export function TopBar({ cartCount, onCartClick }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /** Nav bar contains buttons, for now. This is a single page application. */
  return (
    <header className="topbar">
      <div className="logo">My Webshop</div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <button className = "link-button icon-button"><Home/>Home</button>
        <button className = "link-button icon-button"><Book/>Catalog</button>
        <button className = "link-button icon-button"><Info/>About</button>
        <button className = "link-button icon-button"><Phone/>Contact</button>
        <button
          className="link-button icon-button"
          onClick={onCartClick}
          aria-label={`Cart with ${cartCount} items`}
        >
          <ShoppingCart />
          Cart
          {cartCount > 0 && <span className="cart-bubble">{cartCount}</span>}
        </button>
      </nav>
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <MenuOpen /> : <Menu />}
      </button>
    </header>
  );
}
