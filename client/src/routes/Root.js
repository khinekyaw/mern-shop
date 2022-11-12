import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

const Root = () => {
  return (
    <Layout>
      <Navbar />
      <div className="mx-auto flex flex-1 max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </Layout>
  )
}

export default Root
