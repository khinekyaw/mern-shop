import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import Breadcrumb from '../components/Breadcrumb'
import { cartActions } from '../store/cart-slice'
import { numberWithCommas } from '../utils'

const Product = () => {
  const product = useLoaderData()
  const { name, price, description, imagePath } = product
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(cartActions.add(product))
  }

  return (
    <div className="flex flex-col flex-1 items-center mb-8">
      <Breadcrumb />

      <div className="flex md:w-[890px] flex-col items-center md:flex-row md:items-start">
        <img
          src={imagePath}
          alt={name}
          className="bg-base-200 w-96 h-96 mr-0 md:mr-14 rounded-xl object-cover mb-6 shadow-xl"
        />
        <div className="flex flex-1 flex-col items-start">
          <p className="mb-4 text-xl">{name}</p>
          <p className="text-2xl text-primary mb-5">
            $ {numberWithCommas(price)}
          </p>
          <button
            className="btn btn-primary gap-2 mb-8"
            onClick={handleAddToCart}
          >
            <BsFillCartPlusFill className="text-lg" />
            Add To Cart
          </button>
          <p className="mb-1 underline opacity-70">About</p>
          <p className="opacity-70">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Product
