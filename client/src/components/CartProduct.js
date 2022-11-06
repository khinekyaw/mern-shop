import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'

import { cartActions } from '../store/cart-slice'

const CartProduct = ({ product }) => {
  const { id, name, imagePath, price, amount } = product
  const detailURL = `/products/${id}`
  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(cartActions.add(product))
  }

  const handleRemove = () => {
    dispatch(cartActions.remove(product))
  }

  return (
    <div className="card card-side card-compact border border-base-300 mb-6">
      <Link to={detailURL} className="h-fll w-32 md:h-40 md:w-40">
        <img
          src={imagePath}
          alt={name}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex-1 card-body max-w-[420px]">
        <Link to={detailURL} className="line-clamp-2 link link-hover">
          {name}
        </Link>
        <h2 className="card-title">${price}</h2>
        <div className="card-actions">
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={handleRemove}
          >
            <FiMinus />
          </button>
          <button className="btn btn-sm btn-ghost">{amount || 0}</button>
          <button
            className="btn btn-circle btn-sm btn-ghost"
            onClick={handleAdd}
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartProduct
