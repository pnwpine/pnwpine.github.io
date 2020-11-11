const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/html');
  const options = {
    root: path.join(__dirname)
  }
  res.sendFile('status.html', options);
});

app.listen(port, () => console.log(`Local Server listening on port ${port}!`))
