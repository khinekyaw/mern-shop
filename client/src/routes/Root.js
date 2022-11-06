import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

const Root = () => {
  return (
    <Layout>
      <Navbar />
      <Outlet />
      <Footer />
    </Layout>
  )
}

export default Root
