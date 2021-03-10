const express = require('express')
const routes = require('./routes')

const server = express()

server.use(express.json());
server.use(routes);

server.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

server.listen(3333, () => {
  console.log('Server start on port 3333');
})
