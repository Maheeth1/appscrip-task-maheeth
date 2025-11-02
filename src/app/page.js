"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortValue, setSortValue] = useState("recommended");
  const [filteredCount, setFilteredCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
      const data = await res.json();
      const repeatedProducts = Array(5).fill(data).flat();
      setProducts(repeatedProducts);

      // Initialize filtered count
      setFilteredCount(repeatedProducts.length);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    // Detect mobile and set initial states
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setShowFilters(false); // Always start hidden, only show on mobile when toggled
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Load sort from localStorage
    const savedSort = localStorage.getItem("plp_sort");
    if (savedSort) setSortValue(savedSort);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortValue(value);
    localStorage.setItem("plp_sort", value);
    window.dispatchEvent(new Event("plpSortChanged"));
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleApplyFilters = () => {
    setShowFilters(false); // Hide filters on apply
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://your-site.example/product/${p.id}`,
      name: p.title,
    })),
  };

  return (
    <>
      <Header />

      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Discover Our Products</h1>
          <p className={styles.heroSubtitle}>Curated products for every occasion — refine using the filters.</p>
        </div>
      </section>

      <section aria-labelledby="plp-heading">
        <div className={styles.contentRow}>
          {(!isMobile || showFilters) && (
            <aside className={styles.leftCol} aria-label="Filters">
              <Filters isVisible={true} onApply={handleApplyFilters} />
            </aside>
          )}

          <main className={styles.rightCol}>
            <div className={styles.topMeta}>
              <div className={styles.itemsCount}>Showing <strong>{filteredCount}</strong> items</div>
              <div className={styles.sortBy}>
                Sort by:
                <select
                  value={sortValue}
                  onChange={handleSortChange}
                  aria-label="Sort products"
                  className={styles.sortSelect}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>

            <ProductGrid initialProducts={products} onProductsUpdate={setFilteredCount} />
          </main>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
