const Product = require('../models/product')

const calcualteProductTotal = async data => {
  const productIds = data.map(p => p.id)
  const productRecords = await Product.find({ _id: { $in: productIds } })

  const amount = data.reduce((prev, p) => {
    const productInDb = productRecords.find(pr => pr._id.toString() === p.id)
    return productInDb.price * p.quantity + prev
  }, 0)
  return amount
}

module.exports = { calcualteProductTotal }
