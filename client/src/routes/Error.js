import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

const Error = () => {
  const error = useRouteError()
  // console.log('RouterErr>>', error)

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center">
        <h1 className="text-netural text-4xl font-bold mb-2">{error.status}</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
        <Link to="/" className="btn btn-outline my-3">
          Start Shopping
        </Link>
      </div>
      <Footer />
    </Layout>
  )
}

export default Error
