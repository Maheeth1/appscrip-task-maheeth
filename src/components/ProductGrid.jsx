"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";

export default function ProductGrid({ initialProducts = [], onProductsUpdate }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      setLoading(true);
      try {
        const rawFilters = localStorage.getItem("plp_filters");
        const filters = rawFilters ? JSON.parse(rawFilters) : { category: "all", maxPrice: 1000 };
        const rawSort = localStorage.getItem("plp_sort");
        const sort = rawSort || "recommended";
        let list = [...initialProducts];

        // ✅ Sort first
        if (sort === "price-asc") {
          list.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
          list.sort((a, b) => b.price - a.price);
        }
        // "recommended" is default, no sorting

        // ✅ Filter by category (exact match)
        if (filters.category && filters.category !== "all") {
          list = list.filter(
            (p) => p.category.toLowerCase() === filters.category.toLowerCase()
          );
        }

        // ✅ Filter by price
        if (filters.maxPrice) {
          list = list.filter((p) => p.price <= Number(filters.maxPrice));
        }

        // Simulate async delay for UX feedback
        setTimeout(() => {
          setProducts(list);
          setLoading(false);
          if (onProductsUpdate) onProductsUpdate(list.length);
        }, 150);
      } catch (e) {
        console.warn("Filter/Sort error:", e);
        setProducts(initialProducts);
        setLoading(false);
      }
    };

    applyFiltersAndSort();
    window.addEventListener("plpFiltersChanged", applyFiltersAndSort);
    window.addEventListener("plpSortChanged", applyFiltersAndSort);
    return () => {
      window.removeEventListener("plpFiltersChanged", applyFiltersAndSort);
      window.removeEventListener("plpSortChanged", applyFiltersAndSort);
    };
  }, [initialProducts]);

  if (loading)
    return <p style={{ padding: 16, textAlign: "center" }}>Applying filters…</p>;

  if (!products || products.length === 0)
    return <p style={{ padding: 16, textAlign: "center" }}>No products found.</p>;

  return (
    <div className={styles.grid} role="list">
      {products.map((p) => (
        <div key={p.id} role="listitem">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
