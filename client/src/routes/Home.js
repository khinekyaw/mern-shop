import { useEffect, useState } from 'react'

import Products from '../components/Products'
// import { initialProduct } from '../data'
import productService from '../services/products'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProduct()
    // setProducts(initialProduct)
  }, [])

  const loadProduct = async () => {
    setLoading(true)
    try {
      const result = await productService.getAll()
      setProducts(result)
      setLoading(false)
    } catch (error) {
      alert(error)
      setLoading(false)
    }
  }

  let loadBtnEl = (
    <button
      className="btn btn-primary btn-outline tooltip"
      data-tip="coming soon😎"
      onClick={loadProduct}
    >
      Load More
    </button>
  )

  if (loading) {
    loadBtnEl = (
      <button
        className="btn btn-primary btn-outline loading"
        onClick={loadProduct}
      >
        Loading
      </button>
    )
  }
  if (loading && !products.length) {
    loadBtnEl = (
      <div className="flex flex-1 items-center justify-center">
        <button
          className="btn btn-primary btn-outline loading"
          onClick={loadProduct}
        >
          Loading
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 items-center p-4 md:py-8 md:px-12">
      <Products data={products} />
      {loadBtnEl}
    </div>
  )
}

export default Home
