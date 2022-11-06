import React, { Fragment, useState } from 'react'
import Alert from './Alert'

const defaultProduct = {
  name: '',
  price: '',
  description: '',
  imagePath: '',
}

const ProductForm = ({ onCancel, onSubmit, alert }) => {
  const [product, setProduct] = useState(defaultProduct)

  const clearInputs = () => {
    setProduct(defaultProduct)
  }

  const handleProductChange = label => e => {
    setProduct(state => ({ ...state, [label]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(product, clearInputs)
  }

  return (
    <Fragment>
      <label htmlFor="my-modal" className="btn btn-outline btn-sm mb-6">
        +Add Product
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">New Product</h3>
          <Alert alert={alert} />
          <form
            id="product-form"
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              className="input input-bordered mb-2"
              placeholder="Name"
              value={product.name}
              onChange={handleProductChange('name')}
              required
            />
            <input
              type={'number'}
              className="input input-bordered mb-2"
              placeholder="Price"
              value={product.price}
              onChange={handleProductChange('price')}
              required
            />
            <input
              className="input input-bordered mb-2"
              placeholder="Image Url"
              value={product.imagePath}
              onChange={handleProductChange('imagePath')}
              required
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Description"
              value={product.description}
              onChange={handleProductChange('description')}
              required
            />
          </form>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn btn-ghost"
              onClick={onCancel}
            >
              Cancel
            </label>
            <button
              className="btn btn-primary"
              form="product-form"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductForm
