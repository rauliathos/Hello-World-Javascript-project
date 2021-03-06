


const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')
const fetch = require('node-fetch');
// header('Access-Control-Allow-Origin: *');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('hello_world')
    const hellosCollection = db.collection('hellos');
    const helloRouter = createRouter(hellosCollection);
    app.use('/api/hellos', helloRouter);
  })
  .catch(console.error);

//   app.get('/coin-data', (req, res) => {
//   const url = 'http://localhost:3000/api/hellos';
//
//   fetch(url)  // NEW
//     .then(jsonData => jsonData.json())
//     .then(data => console.log('hello',data));
// });

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
