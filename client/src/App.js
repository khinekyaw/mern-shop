import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/Root'
import Home from './routes/Home'
import Error from './routes/Error'
import Product from './routes/Product'
import Cart from './routes/Cart'

import { productLoader } from './routes/loaders'
import Login from './routes/Login'
import Register from './routes/Register'
import Order from './routes/Order'
import Admin from './routes/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'products/:productId',
        element: <Product />,
        loader: productLoader,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
