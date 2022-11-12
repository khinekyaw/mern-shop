import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import orderService from '../../services/orders'
import Badge from '../Badge'

const AdminOrder = ({ id, product, quantity }) => {
  return (
    <div className="flex justify-between p-2 rounded-sm border-b">
      <div className="flex-1">{product.name}</div>
      <div className="font-bold">
        ${product.price} × {quantity}
      </div>
    </div>
  )
}

const OrdersTab = () => {
  const [orders, setOrders] = useState([])
  const user = useSelector(state => state.user.user)

  const getInitialData = async () => {
    try {
      const result = await orderService.getAll('admin')
      setOrders(result)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user) orderService.setToken(user.token)
    getInitialData()
  }, [user])

  const orderEl = orders.length
    ? orders.map(({ id, user, products, amount, address, phone, status }) => {
        return (
          <div key={id}>
            <div className="collapse border border-base-300 bg-base-100 rounded-box mb-3">
              <input type="checkbox" />
              <div className="collapse-title flex flex-col md:flex-row justify-between items-center">
                <Badge status={status} />
                <p>
                  <span className="font-bold">
                    {user.name}({user.username})
                  </span>
                </p>
                <p>{address}</p>
                <p>{phone}</p>
                <p>
                  total:{' '}
                  <span className="text-primary font-bold">
                    ${amount.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="collapse-content">
                {products.map(p => {
                  return (
                    <AdminOrder
                      key={p.id}
                      product={p.product}
                      quantity={p.quantity}
                    />
                  )
                })}
                <div className="tooltip tooltip-right" data-tip="coming soon">
                  <select
                    className="select select-bordered w-full max-w-xs mt-4"
                    disabled
                  >
                    <option>pending</option>
                    <option>delivered</option>
                    <option>cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      })
    : null

  return <div>{orderEl}</div>
}

export default OrdersTab
