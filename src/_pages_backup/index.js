import Head from 'next/head'
import axios from 'axios'
import Header from '../components/Header'
import Filters from '../components/Filters'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function Home({ products }) {
  // Basic structured data (ItemList)
  const itemListElements = products.map((p, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "url": `https://your-site.com/product/${p.id}`,
    "name": p.title
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": itemListElements
  }

  return (
    <>
      <Head>
        <title>Shop — Product Listing | Appscrip Task</title>
        <meta name="description" content="Browse curated products — responsive Product Listing Page implemented with SSR and SEO best practices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://your-site.com/" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      <Header />

      <main className="container">
        <h1 className="sr-only">Product Listing</h1>

        <aside className="sidebar">
          <h2>Filters</h2>
          <Filters />
        </aside>

        <section className="listing">
          <h2 className="vis-h2">All Products</h2>
          <ProductGrid products={products} />
        </section>
      </main>

      <Footer />
    </>
  )
}

// SSR fetch using getServerSideProps to demonstrate SSR knowledge
export async function getServerSideProps() {
  try {
    const res = await axios.get('https://fakestoreapi.com/products')
    const products = res.data.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      description: p.description,
      category: p.category
    }))
    return { props: { products } }
  } catch (err) {
    console.error('API fetch error', err)
    return { props: { products: [] } }
  }
}
