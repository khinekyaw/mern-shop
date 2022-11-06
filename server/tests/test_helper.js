const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialProduct = [
  {
    name: 'Atomatic Habits',
    description: 'Tiny Changes, Remarkable Results',
    price: 15,
    imagePath:
      'https://m.media-amazon.com/images/I/51-uspgqWIL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    createdAt: '2022-10-30T17:43:28.046Z',
  },
  {
    name: 'Thinking, Fast and Slow',
    description: 'Major New York Times Bestseller',
    price: 7.3,
    imagePath:
      'https://m.media-amazon.com/images/I/41wI53OEpCL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    createdAt: '2022-10-30T17:43:28.046Z',
  },
]

const initialUsers = [
  {
    username: 'root',
    name: 'Root',
    password: 'rootpassword',
  },
  {
    username: 'admin',
    name: 'Admin',
    password: 'adminpassword',
  },
]

const productsInDb = async () => {
  const allProudcts = await Product.find({})
  return allProudcts.map(r => r.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const usersTokens = async () => {
  const users = await usersInDb()

  return users.map(({ username, id }) => {
    return jwt.sign({ username, id }, process.env.SECRET)
  })
}

module.exports = {
  initialProduct,
  initialUsers,
  productsInDb,
  usersInDb,
  usersTokens,
}
