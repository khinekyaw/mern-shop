import React from 'react'
import CartProduct from './CartProduct'

const CartProducts = ({ data }) => {
  return data.map(p => <CartProduct key={p.id} product={p} />)
}

export default CartProducts
