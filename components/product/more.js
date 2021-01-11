import ProductPreview from './preview'

export default function More({ products }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {products.map((product) => (
          <ProductPreview
            key={product.slug}
            title={product.title}
            image={product.image[0]}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  )
}
