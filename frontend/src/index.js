const express = require('express')
const app = express()
const port = 3333

app.get('/', (request, response) => {
  response.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})