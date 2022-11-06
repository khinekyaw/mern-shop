import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="h-max min-h-screen flex flex-col bg-base-100">
      {children}
    </div>
  )
}

export default Layout
