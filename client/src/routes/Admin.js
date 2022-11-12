import React, { useState } from 'react'
import OrdersTab from '../components/Admin/OrdersTab'
import ProductsTab from '../components/Admin/ProductsTab'

const Admin = () => {
  const [tabState, setTabState] = useState(0)
  const tabs = [
    {
      title: 'Products',
      element: <ProductsTab />,
    },
    {
      title: 'Orders',
      element: <OrdersTab />,
    },
  ]

  const handleOnTabChange = state => {
    setTabState(state)
  }

  return (
    <div className="w-full my-8">
      <h1 className="text-2xl mb-6">Admin</h1>
      <div className="tabs mb-6">
        {tabs.map((t, index) => {
          const className = ['tab', 'tab-lifted']
          if (index === tabState) className.push('tab-active')
          return (
            <div
              key={index}
              className={className.join(' ')}
              onClick={() => handleOnTabChange(index)}
            >
              {t.title}
            </div>
          )
        })}
      </div>
      {tabs[tabState].element}
    </div>
  )
}

export default Admin
