import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Badge from '../components/Badge'

import OrderProduct from '../components/OrderProduct'
import orderService from '../services/orders'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.user.user)

  const loadOrders = useCallback(async () => {
    if (user) orderService.setToken(user.token)
    try {
      setLoading(true)
      const result = await orderService.getAll()
      setOrders(result)
      setLoading(false)
    } catch (err) {
      alert(err)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const orderEl = orders.length ? (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl">Your Orders</h1>
      {orders.map(({ id, products, createdAt, status }) => {
        const createdDate = new Date(createdAt)
        return (
          <div key={id}>
            <div className="divider my-6">{createdDate.toLocaleString()}</div>
            <div className="bg-base-200 p-4 md:py-6 md:px-8 rounded-box">
              <div className="mb-4">
                <Badge status={status} />
              </div>
              {products.map(p => {
                return (
                  <OrderProduct
                    key={p.id}
                    product={p.product}
                    quantity={p.quantity}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  ) : null

  return (
    <div className="flex flex-col flex-1 self-center justify-center items-center my-8">
      {orderEl}
      {loading ? (
        <button className="btn btn-primary btn-outline loading">LOADING</button>
      ) : null}
      {!(loading || orderEl) ? <p>No data</p> : null}
    </div>
  )
}

export default Order
