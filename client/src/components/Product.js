import { Link } from 'react-router-dom'
import { numberWithCommas } from '../utils'

const Product = ({ id, name, imagePath, price }) => {
  const detailURL = `/products/${id}`

  return (
    <div className="card card-compact border border-base-300">
      <Link to={detailURL} className="h-32 md:h-44">
        <img
          src={imagePath}
          alt={name}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="card-body">
        <h2 className="card-title">$ {numberWithCommas(price)}</h2>
        <Link
          to={detailURL}
          className="line-clamp-2 md:line-clamp-3 link link-hover"
        >
          {name}
        </Link>
      </div>
    </div>
  )
}

export default Product
