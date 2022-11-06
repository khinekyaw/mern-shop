# 🪐Centaurium Ecommerce

## Lore

Mysterious online store selling unique items ranging from homemade chocolate bars to spacecraft.😄

## Description

Simple online store created with the MERN stack, Tailwind CSS, and 🌼[daisyUI](https://daisyui.com/). At the moment, only the administrator can sell products, and multiple clients can purchase multiple products. You can use the cart without creating an account, but you must create one to order. There are no stock restrictions. There is also no API for creating admin accounts. You can create the admin account by first creating a user and then changing the 'isAdmin' field in the database to 'true.'

## Demo

Deployed on [Heroku(live)](https://centaurium-shop.herokuapp.com/)

## Install

1. clone the repo

```
$ git clone https://github.com/khinekyaw/mern-shop.git
```

2. install backend packages

```
$ cd project
$ yarn install
```

3. install frontend packages

```
$ cd client
$ yarn install
```

##

## Setup

Create `.env` file that include:

```env eg
MONGO_URI = 'mongodb_uri'
SECRET = 'secret'
PORT = 5000
```

## Start development

```
yarn dev
```

##

## Bugs

1. Token expired (to handle)

## Working Updates

1. Clean React Components
2. Product update & delete
3. Products pagination
4. Testing
