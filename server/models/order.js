const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

orderSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id
    returnedObj.products = returnedObj.products.map(p => {
      p.id = p._id
      delete p._id
      return p
    })
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Order', orderSchema)
