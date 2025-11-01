"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";

export default function ProductGrid({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const applyFilters = () => {
      setLoading(true);
      try {
        const raw = localStorage.getItem("plp_filters");
        const filters = raw ? JSON.parse(raw) : null;
        let list = [...initialProducts];
        if (filters) {
          if (filters.segment && filters.segment !== "all") {
            if (filters.segment === "mens") list = list.filter(p => p.category.includes("men"));
            if (filters.segment === "womens") list = list.filter(p => p.category.includes("women"));
            if (filters.segment === "kids") list = list.filter(p => p.category.includes("kids"));
          }
          if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice));
        }
        setTimeout(() => { setProducts(list); setLoading(false); }, 120);
      } catch (e) {
        console.warn(e); setProducts(initialProducts); setLoading(false);
      }
    };

    applyFilters();
    window.addEventListener("plpFiltersChanged", applyFilters);
    return () => window.removeEventListener("plpFiltersChanged", applyFilters);
  }, [initialProducts]);

  if (loading) return <p style={{ padding: 16, textAlign: "center" }}>Applying filters…</p>;
  if (!products || products.length === 0) return <p style={{ padding: 16, textAlign: "center" }}>No products found.</p>;

  return (
    <div className={styles.grid} role="list">
      {products.map(p => (
        <div key={p.id} role="listitem">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
