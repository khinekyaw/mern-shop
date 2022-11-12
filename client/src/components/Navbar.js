import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { calculateTotalAmount } from '../utils'
import { userActions } from '../store/user-slice'

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('DELIVERY_INFO')
    dispatch(userActions.clear())
    navigate('/')
  }

  const indicatorEl = cartItems.length ? (
    <span className="badge badge-sm indicator-item">
      {calculateTotalAmount(cartItems)}
    </span>
  ) : null

  const ordersEl = user ? (
    <li className="hidden sm:block">
      <NavLink to="/order">Orders</NavLink>
    </li>
  ) : null

  const signInEl = !user ? (
    <li>
      <NavLink to="/login">Sign in</NavLink>
    </li>
  ) : null

  const adminEl =
    user && user.isAdmin ? (
      <li className="hidden sm:block">
        <NavLink to="/admin">Admin</NavLink>
      </li>
    ) : null

  const profileEl = user ? (
    <div className="dropdown dropdown-end hidden sm:block">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle text-xl font-bold"
      >
        <BsPerson className="text-2xl" />
      </button>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  ) : null

  return (
    <div className="navbar glass sticky top-0 z-50  p-0 m-0">
      <div className="mx-auto flex flex-1 max-w-screen-xl sm:px-6 lg:px-8">
        <div className="sm:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? (
                <li>
                  <NavLink to="/order">Orders</NavLink>
                </li>
              ) : null}
              {user && user.isAdmin ? (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              ) : null}
              {user ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : null}
              {!user ? (
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              ) : null}
              {!user ? (
                <li>
                  <NavLink to="/login">Sign in</NavLink>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <Link to="/" className="normal-case text-lg">
            <span className="text-2xl">🪐</span>CENTAURIUM
          </Link>
        </div>
        <div className="flex">
          <ul className="menu menu-horizontal p-0">
            {ordersEl}
            {signInEl}
            {adminEl}
            <li>
              <NavLink to="/cart" className="btn btn-ghost btn-square">
                <div className="indicator">
                  <AiOutlineShoppingCart className="text-2xl stroke-2" />
                  {indicatorEl}
                </div>
              </NavLink>
            </li>
          </ul>

          {profileEl}
        </div>
      </div>
    </div>
  )
}

export default Navbar
