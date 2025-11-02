"use client";
import { useState, useEffect } from "react";
import styles from "./Filters.module.css";

export default function Filters({ isVisible, onApply }) {
  const [expanded, setExpanded] = useState(true);
  const [filters, setFilters] = useState({
    category: "all",
    maxPrice: 1000,
  });

  // Update filters and trigger grid refresh
  function update(key, value) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    try {
      localStorage.setItem("plp_filters", JSON.stringify(next));
      window.dispatchEvent(new Event("plpFiltersChanged"));
    } catch (e) {
      console.warn("Filter update error:", e);
    }
  }

  // Initialize filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("plp_filters");
    if (saved) setFilters(JSON.parse(saved));
  }, []);

  if (!isVisible) return null;

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3>Filters</h3>
        <button
          onClick={() => setExpanded((s) => !s)}
          className={styles.toggleBtn}
          aria-expanded={expanded}
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      {expanded && (
        <div className={styles.body}>
          {/* Category Filter */}
          <div className={styles.section}>
            <label className={styles.label}>Category</label>
            <select
              value={filters.category}
              onChange={(e) => update("category", e.target.value)}
              className={styles.select}
            >
              <option value="all">All</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelry</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className={styles.section}>
            <label className={styles.label}>
              Max Price: <strong>${filters.maxPrice}</strong>
            </label>
            <input
              className={styles.range}
              type="range"
              min="10"
              max="1000"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => update("maxPrice", e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className={styles.actions}>
            <button
              className={styles.clearBtn}
              onClick={() => {
                const reset = { category: "all", maxPrice: 1000 };
                setFilters(reset);
                localStorage.setItem("plp_filters", JSON.stringify(reset));
                window.dispatchEvent(new Event("plpFiltersChanged"));
              }}
            >
              Clear
            </button>
            <button
              className={styles.applyBtn}
              onClick={() => {
                window.dispatchEvent(new Event("plpFiltersChanged"));
                if (onApply) onApply();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
