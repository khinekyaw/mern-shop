import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import ProductForm from '../ProductForm'
import productService from '../../services/products'
import { useSelector } from 'react-redux'

const ProductsTab = () => {
  const [products, setProducts] = useState([])
  const [alert, setAlert] = useState(null)
  const user = useSelector(state => state.user.user)

  const handleSave = async (product, clearForm) => {
    try {
      const returnedProduct = await productService.create(product)
      setProducts(state => [returnedProduct, ...state])
      setAlert({
        message: 'Product successfully created.',
        type: 'success',
      })
      clearForm()
    } catch (err) {
      setAlert({
        message: err.response.data.error || 'Something want wrong!',
        type: 'error',
      })
    }
  }

  const handleCancel = () => {
    setAlert(null)
  }

  useEffect(() => {
    if (user) {
      productService.setToken(user.token)
      productService.getAll().then(setProducts)
    }
  }, [user])

  return (
    <Fragment>
      <ProductForm
        onCancel={handleCancel}
        onSubmit={handleSave}
        alert={alert}
      />
      <div>
        {!products.length ||
          products.map(({ id, name, description, price, imagePath }) => (
            <div
              key={id}
              className="flex items-center border border-base-300 bg-base-100 rounded-box p-3 mb-4"
            >
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12 mr-3">
                  <img src={imagePath} alt={name} />
                </div>
              </div>
              <Link
                to={`/products/${id}`}
                className="link link-hover font-bold flex-auto w-64 mr-3 line-clamp-2"
              >
                {name}
              </Link>
              <div className="mr-3 flex-1">{price}</div>
              <div className="flex-auto w-80 line-clamp-2 mr-3">
                {description}
              </div>
              <div className="tooltip" data-tip="coming soon">
                <button className="btn btn-sm btn-outline btn-square" disabled>
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  )
}

export default ProductsTab
