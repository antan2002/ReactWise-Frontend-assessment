import { PRODUCTS } from "./data/products";
import { useCart } from "./hooks/useCart";
import { ProductCatalog } from "./components/ProductCatalog";
import { CartDisplay } from "./components/CartDisplay";
import { formatCurrency } from "./utils/formatCurrency";

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="store-app">
      <aside className="announcement-bar" aria-label="Store announcement">
        <div className="container announcement-content">
          <div className="announcement-left">
            <span className="material-symbols-outlined announcement-symbol" aria-hidden="true">
              science
            </span>
            <span className="announcement-text">
              <strong>HTE Research Grade:</strong> Certified RNase/DNase-Free Microplates
            </span>
          </div>
          <span className="announcement-highlight">Research-grade &middot; Automation compatible</span>
        </div>
      </aside>

      <header className="store-header">
        <div className="container header-container">
          <div className="brand-group">
            <div className="brand-icon" aria-hidden="true">
              <span className="material-symbols-outlined brand-symbol">science</span>
            </div>
            <div className="brand-text-block">
              <h1 className="brand-title">OmniPlate Labware</h1>
              <p className="brand-subtitle">High-Throughput Experimentation Supplies</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="header-cart-indicator" title="Current Cart Total">
              <span className="material-symbols-outlined header-cart-symbol">shopping_cart</span>
              <div className="header-cart-info">
                <span className="header-cart-count">
                  {totalQuantity} {totalQuantity === 1 ? "plate" : "plates"}
                </span>
                <span className="header-cart-price">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container main-layout">
        <div className="catalog-column">
          <ProductCatalog
            products={PRODUCTS}
            onAddToCart={addToCart}
          />
        </div>

        <aside className="cart-column" aria-label="Shopping Cart Sidebar">
          <div className="sticky-cart-pane">
            <CartDisplay
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
            />
          </div>
        </aside>
      </main>

      <footer className="store-footer">
        <div className="container footer-content">
          <p className="footer-copyright">
            &copy; {CURRENT_YEAR} OmniPlate Labware Inc. Built for High-Throughput Experimentation.
          </p>
        </div>
      </footer>
    </div>
  );
}
