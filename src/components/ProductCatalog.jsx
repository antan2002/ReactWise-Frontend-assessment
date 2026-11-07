import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export function ProductCatalog({ products, onAddToCart }) {
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 750);
  };

  return (
    <section className="catalog-section" aria-labelledby="catalog-heading">
      <div className="section-header">
        <div>
          <h2 id="catalog-heading" className="section-title">
            Product Catalog
          </h2>
          <p className="section-subtitle">
            High-Throughput Experimentation (HTE) plates with SBS/ANSI standard dimensions.
          </p>
        </div>
        <span className="stock-count-badge">{products.length} Plates Available</span>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const isAdded = recentlyAddedId === product.id;

          return (
            <article key={product.id} className="product-card">
              {/* Microplate visual representation */}
              <div className="plate-visual-box" aria-hidden="true">
                <div className="plate-grid-preview">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span key={i} className="plate-well" />
                  ))}
                </div>
              </div>

              <div className="product-card-content">
                <div className="product-badges">
                  {product.wells && <span className="spec-badge spec-wells">{product.wells}</span>}
                  {product.material && <span className="spec-badge spec-mat">{product.material}</span>}
                </div>

                <h3 className="product-name">{product.name}</h3>
                {product.sku && <div className="product-sku">Ref #{product.sku}</div>}
                {product.description && <p className="product-desc">{product.description}</p>}

                <div className="product-card-bottom">
                  <div className="price-stack">
                    <span className="price-caption">Unit Price</span>
                    <span className="product-price">{formatCurrency(product.price)}</span>
                  </div>

                  <button
                    type="button"
                    className={`btn-add-cart ${isAdded ? "is-added" : ""}`}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {isAdded ? (
                      <>
                        <span className="material-symbols-outlined btn-icon" aria-hidden="true">
                          check
                        </span>
                        <span className="btn-label-text">Added!</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined btn-icon" aria-hidden="true">
                          add_shopping_cart
                        </span>
                        <span className="btn-label-text">Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
