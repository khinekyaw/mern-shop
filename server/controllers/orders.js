const orderRouter = require('express').Router()
const Order = require('../models/order')
const { calcualteProductTotal } = require('../utils/order_helper')
const { userExtractor } = require('../utils/middleware')

orderRouter.get('/', userExtractor, async (request, response) => {
  let query = { user: request.user._id }

  // Temporary handler for admin
  if (request.user.isAdmin && request.query.type === 'admin') {
    query = {}
  }

  console.log(request.params)

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .populate('user', { name: 1, username: 1 })
    .populate({
      path: 'products',
      populate: {
        path: 'product',
        select: { name: 1, price: 1, imagePath: 1 },
      },
    })
  response.json(orders)
})

orderRouter.post('/', userExtractor, async (request, response) => {
  const { products, phone, address } = request.body

  const transformedProducts = products.map(p => ({
    product: p.id,
    quantity: p.quantity,
  }))

  const amount = await calcualteProductTotal(products)

  const newOrder = new Order({
    user: request.user._id,
    products: transformedProducts,
    amount,
    phone,
    address,
  })
  const returnedOrder = await newOrder.save()

  response.status(201).json(returnedOrder)
})

orderRouter.delete('/:id', async (request, response) => {})

// For development only
orderRouter.get('/temp/clear', async (request, response) => {
  await Order.deleteMany({})
  response.json({ message: 'cleared all orders' })
})

module.exports = orderRouter
