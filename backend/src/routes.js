const express = require('express');

const routes = express.Router()

routes.post('/add-transaction', (request, response) => {
  return response.json({ message: 'Test' })
})

module.exports = routes