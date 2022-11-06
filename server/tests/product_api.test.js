const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Product = require('../models/product')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Product.deleteMany({})

  let product = new Product(helper.initialProduct[0])
  await product.save()

  product = new Product(helper.initialProduct[1])
  await product.save()
})

describe('when there are some products in db', () => {
  test('products are return as json', async () => {
    const result = await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveLength(helper.initialProduct.length)
  })

  test('single product return as json', async () => {
    const productsAtStart = await helper.productsInDb()
    const productToView = productsAtStart[0]

    const result = await api
      .get(`/api/products/${productToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual(JSON.parse(JSON.stringify(productToView)))
  })
})

describe('addition of a product', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    let passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)
    let user = new User({
      username: helper.initialUsers[0].username,
      name: helper.initialUsers[0].name,
      passwordHash,
    })
    await user.save()
  })

  test('valid product returned with status code 201', async () => {
    const productsAtStart = await helper.productsInDb()
    const tokens = await helper.usersTokens()
    const token = tokens[0]

    const newProduct = {
      name: 'New Product',
      price: 10,
    }

    await api
      .post('/api/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const productsAtEnd = await helper.productsInDb()
    expect(productsAtEnd).toHaveLength(productsAtStart.length + 1)

    const names = productsAtEnd.map(r => r.name)
    expect(names).toContain('New Product')
  })

  test('fail with status code 400 if name or price missing', async () => {
    const tokens = await helper.usersTokens()
    const token = tokens[0]

    const newProduct = [
      {
        price: 10,
      },
      {
        name: 'New Product',
      },
    ]

    await api
      .post('/api/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProduct[0])
      .expect(400)
    await api
      .post('/api/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProduct[1])
      .expect(400)
  })
})

describe('deletion of a product', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const productsAtStart = await helper.productsInDb()
    const productToDelete = productsAtStart[0]
    const tokens = await helper.usersTokens()
    const token = tokens[0]

    await api
      .delete(`/api/products/${productToDelete.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const productsAtEnd = await helper.productsInDb()

    expect(productsAtEnd).toHaveLength(productsAtStart.length - 1)
  })
})

describe('updating a spicific product', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const productsAtStart = await helper.productsInDb()
    const productToUpdate = productsAtStart[0]
    const tokens = await helper.usersTokens()
    const token = tokens[0]

    const updatedProduct = {
      name: 'New Product (edited)',
      price: 12,
    }

    await api
      .put(`/api/products/${productToUpdate.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send(updatedProduct)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const productsAtEnd = await helper.productsInDb()
    const names = productsAtEnd.map(r => r.name)

    expect(productsAtEnd).toHaveLength(productsAtStart.length)
    expect(names).toContain('New Product (edited)')
  })
})
