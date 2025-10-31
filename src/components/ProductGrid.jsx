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
          // map our generic filters to fakestore categories where possible
          if (filters.segment && filters.segment !== "all") {
            // fakestore categories: "men's clothing", "women's clothing", "jewelery", "electronics"
            if (filters.segment === "mens") list = list.filter(p => p.category.includes("men"));
            if (filters.segment === "womens") list = list.filter(p => p.category.includes("women"));
            if (filters.segment === "kids") list = list.filter(p => p.category.includes("kids"));
          }
          if (filters.maxPrice) list = list.filter(p => p.price <= Number(filters.maxPrice));
          // further filters (pattern, fabric etc.) aren't directly mappable to fakestore — kept UI-only
        }
        // short debounce for UX
        setTimeout(() => { setProducts(list); setLoading(false); }, 120);
      } catch (e) {
        console.warn(e); setProducts(initialProducts); setLoading(false);
      }
    };

    // initial apply
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
