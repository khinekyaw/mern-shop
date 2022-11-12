import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsCheckCircle } from 'react-icons/bs'

import CartProducts from '../components/CartProducts'
import Checkout from '../components/Checkout'
import orderService from '../services/orders'
import { cartActions } from '../store/cart-slice'

const Cart = () => {
  const [orderState, setOrderState] = useState(null)
  const cartItems = useSelector(state => state.cart.items)
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) orderService.setToken(user.token)
  }, [user])

  const onOrder = async ({ phone, address }) => {
    if (user) {
      const transformItems = cartItems.map(i => ({
        id: i.id,
        quantity: i.amount,
      }))
      const readyData = { products: transformItems, phone, address }

      try {
        const returnedOrder = await orderService.create(readyData)
        setOrderState(returnedOrder)
        dispatch(cartActions.clear())
      } catch (err) {
        console.log(err)
        alert(err)
      }
    } else {
      navigate('/login')
    }
  }

  const emptyCartEl = (
    <div className="flex flex-1 flex-col items-center my-32">
      <h2 className="mb-6">Your cart is empty (as my wallet😂) </h2>
      <Link to="/" className="btn btn-outline">
        Go To Shop
      </Link>
    </div>
  )

  const cartItemEl = (
    <div className="flex flex-1 flex-col md:flex-row items-center md:items-start my-8">
      <div className="flex-1 mb-8 mx-2 md:mr-14">
        <h2 className="text-2xl mb-8">Shopping Cart</h2>
        <CartProducts data={cartItems} />
      </div>
      <Checkout onOrder={onOrder} />
    </div>
  )

  const cartEl = orderState ? (
    <div className="flex flex-1 flex-col justify-center items-center">
      <BsCheckCircle className="text-success text-6xl mb-6" />
      <h1 className="text-4xl mb-4 text-center">Thank for your purchase</h1>
      <p className="mb-6 text-center">Your order number is : {orderState.id}</p>
      <Link to="/" className="btn btn-outline btn-success">
        Continue Shopping
      </Link>
    </div>
  ) : cartItems.length ? (
    cartItemEl
  ) : (
    emptyCartEl
  )

  return cartEl
}

export default Cart
