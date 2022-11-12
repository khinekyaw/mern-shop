import { Link } from 'react-router-dom'

function Breadcrumb() {
  return (
    <div className="text-sm breadcrumbs my-4">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>Category (coming soon)</li>
      </ul>
    </div>
  )
}

export default Breadcrumb
