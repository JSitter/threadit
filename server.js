const express = require('express')
const app = express()

app.set('views', 'handlebars')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/posts/new', function(req, res) {
    res.render('./posts-new.handlebars')
})

app.listen(8082, function () {
  console.log('Example app listening on port 8082!')
})
