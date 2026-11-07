import { formatCurrency } from "../utils/formatCurrency";
import { OrderSummary } from "./OrderSummary";

export function CartDisplay({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  totalQuantity,
  totalPrice,
}) {
  const isCartEmpty = cart.length === 0;

  return (
    <section className="cart-section" aria-labelledby="cart-heading">
      <div className="cart-header">
        <div className="cart-title-row">
          <h2 id="cart-heading" className="cart-heading">
            Your Cart
          </h2>
          <span className="cart-count-badge">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </span>
        </div>

        {!isCartEmpty && onClearCart && (
          <button
            type="button"
            className="btn-clear-cart"
            onClick={onClearCart}
            title="Empty shopping cart"
          >
            Clear all
          </button>
        )}
      </div>

      {isCartEmpty ? (
        <div className="empty-cart-state">
          <div className="empty-icon-circle" aria-hidden="true">
            <span className="material-symbols-outlined empty-cart-symbol">
              remove_shopping_cart
            </span>
          </div>
          <h3 className="empty-title">Your cart is empty</h3>
          <p className="empty-desc">
            Browse our catalog on the left to add HTE plates to your order.
          </p>
        </div>
      ) : (
        <div className="cart-items-wrapper">
          <ul className="cart-items-list" aria-label="Cart plate items">
            {cart.map((item) => {
              const itemSubtotal = item.price * item.quantity;
              return (
                <li key={item.id} className="cart-item-card">
                  <div className="cart-item-top">
                    <div>
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-unit-price">
                        {formatCurrency(item.price)} each
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => onRemoveFromCart(item.id)}
                      title={`Remove ${item.name} from cart`}
                      aria-label={`Remove ${item.name}`}
                    >
                      <span className="material-symbols-outlined remove-symbol" aria-hidden="true">
                        delete
                      </span>
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <div
                      className="quantity-stepper"
                      role="group"
                      aria-label={`Quantity adjustment for ${item.name}`}
                    >
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <span className="material-symbols-outlined stepper-symbol" aria-hidden="true">
                          remove
                        </span>
                      </button>
                      <span className="stepper-count" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <span className="material-symbols-outlined stepper-symbol" aria-hidden="true">
                          add
                        </span>
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      <span className="subtotal-prefix">Subtotal</span>
                      <span className="subtotal-value">{formatCurrency(itemSubtotal)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <OrderSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
    </section>
  );
}
