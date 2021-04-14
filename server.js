const express = require('express')
const server = express()
server.set('views', __dirname + '/views');
server.set('view engine', 'jsx');
server.engine('jsx', require('./utils/express-with-react').createEngine());

server.get('/', (request, response) =>{
  response.render("welcome", {title: "Welcome to express React"} )
})

server.get('/about', (request, response) =>{
  response.render("about", {title: "This is the about page"} )
})


server.listen(3333)