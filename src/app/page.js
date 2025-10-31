import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default async function Page() {
  const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
  const products = (await res.json()) || [];

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

      <section className="container" aria-labelledby="plp-heading">
        <div className={styles.contentRow}>
          <aside className={styles.leftCol} aria-label="Filters">
            <Filters />
          </aside>

          <main className={styles.rightCol}>
            <div className={styles.topMeta}>
              <div className={styles.itemsCount}>Showing <strong>{products.length}</strong> items</div>
              <div className={styles.sortBy}>Sort by:
                <select defaultValue="recommended" aria-label="Sort products" className={styles.sortSelect}>
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>

            <ProductGrid initialProducts={products} />
          </main>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
