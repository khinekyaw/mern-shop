import { Link } from 'react-router-dom'

const OrderProduct = ({ product, quantity }) => {
  const { id, name, imagePath, price } = product
  const detailURL = `/products/${id}`

  return (
    <div className="card card-side card-compact bg-base-100 border border-base-300 mb-6">
      <Link to={detailURL} className="h-32 w-32">
        <img
          src={imagePath}
          alt={name}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex-1 card-body">
        <Link to={detailURL} className="line-clamp-1 link link-hover">
          {name}
        </Link>
        <h2 className="card-title">${price}</h2>
        <div className="text-lg">× {quantity}</div>
      </div>
    </div>
  )
}

export default OrderProduct
