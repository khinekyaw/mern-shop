const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially some user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    let passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)
    let user = new User({
      username: helper.initialUsers[0].username,
      name: helper.initialUsers[0].name,
      passwordHash,
    })
    await user.save()

    passwordHash = await bcrypt.hash(helper.initialUsers[1].password, 10)
    user = new User({
      username: helper.initialUsers[1].username,
      name: helper.initialUsers[1].name,
      passwordHash,
    })
    await user.save()
  })

  test('all users are returned as json', async () => {
    const usersAtStart = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(usersAtStart.body).toHaveLength(helper.initialUsers.length)
  })
})

describe('when there is initially one user in db', () => {
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

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'daniel',
      name: 'Daniel Rio',
      password: 'rio',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})
