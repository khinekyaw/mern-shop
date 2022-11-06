import Product from './Product'

const Products = ({ data }) => {
  if (!(data && data.length)) return null

  return (
    <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-4 md:mb-6">
      {data.map(p => (
        <Product key={p.id} {...p} />
      ))}
    </div>
  )
}

export default Products
