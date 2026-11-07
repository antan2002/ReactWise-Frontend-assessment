import { formatCurrency } from "../utils/formatCurrency";

export function OrderSummary({ totalQuantity, totalPrice }) {
  return (
    <div className="order-summary-box">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span className="summary-label">Total quantity</span>
          <span className="summary-value">
            {totalQuantity} {totalQuantity === 1 ? "plate" : "plates"}
          </span>
        </div>

        <div className="summary-divider" />

        <div className="summary-row total-row">
          <span className="total-label">Final order total</span>
          <span className="total-value">{formatCurrency(totalPrice)}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn-checkout"
        disabled={totalQuantity === 0}
        onClick={() =>
          alert(`Checkout: ${totalQuantity} items, ${formatCurrency(totalPrice)}`)
        }
      >
        <span className="material-symbols-outlined btn-icon" aria-hidden="true">
          shopping_bag
        </span>
        Proceed to checkout
      </button>
    </div>
  );
}
