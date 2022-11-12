import { useState } from 'react'
import { useSelector } from 'react-redux'
import { calculateTotalPrice, numberWithCommas } from '../utils'

const DI_KEY = 'DELIVERY_INFO'

const Checkout = ({ onOrder }) => {
  const deliveryInfo = JSON.parse(localStorage.getItem(DI_KEY) || '{}')
  const [phone, setPhone] = useState(deliveryInfo.phone || '')
  const [address, setAddress] = useState(deliveryInfo.address || '')

  const cartItems = useSelector(state => state.cart.items)
  const totalPrice = calculateTotalPrice(cartItems)

  const handleOrder = e => {
    e.preventDefault()
    localStorage.setItem(DI_KEY, JSON.stringify({ phone, address }))
    onOrder({ phone, address })
  }

  return (
    <div className="w-[480px] h-fit card shadow-lg">
      <form className="card-body" onSubmit={handleOrder}>
        <div className="card-title">
          <h2 className="mb-4">Checkout</h2>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg">Total</span>
          <span className="text-3xl text-primary">
            $ {numberWithCommas(totalPrice)}
          </span>
        </div>
        <div className="divider"></div>
        <p>Payment Method</p>
        <select className="select select-bordered mb-3">
          <option>Cash on Delivery</option>
          <option disabled>Coming Soon</option>
        </select>
        <input
          type="tel"
          pattern=".{8,}"
          title="Eight or more characters"
          className="input input-bordered mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        ></input>
        <input
          className="input input-bordered mb-3"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        ></input>
        <button className="btn btn-primary">Order Now</button>
      </form>
    </div>
  )
}

export default Checkout
