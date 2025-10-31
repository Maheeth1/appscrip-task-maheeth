"use client";
import styles from "../styles/ProductCard.module.css";

export default function ProductCard({ product }) {
  return (
    <article className={styles.card} aria-labelledby={`p-${product.id}`}>
      <a href="#" className={styles.link} onClick={(e)=>e.preventDefault()}>
        <div className={styles.media}>
          <img src={product.image} alt={`Image of ${product.title}`} />
        </div>

        <div className={styles.info}>
          <h3 id={`p-${product.id}`} className={styles.title}>{product.title}</h3>
          <div className={styles.row}>
            <div className={styles.price}>${product.price.toFixed(2)}</div>
            <div className={styles.badge}>{product.category}</div>
          </div>
        </div>
      </a>
    </article>
  );
}
