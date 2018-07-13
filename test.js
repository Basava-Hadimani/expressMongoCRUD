const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://Basu:Basu%40480478143@ds135441.mlab.com:35441/basuhadimani94',{ 
    useNewUrlParser: true 
    }, (err, client) => {
		if (err) return console.log(err)
		db = client.db('basuhadimani94'); // whatever your database name is

		app.post('/quotes', (req, res) => {
			console.log(req.body);
			db.collection('quotes').save(req.body, (err, result) => {
			if (err) return console.log(err)

			console.log('saved to database')
			res.redirect('/')
			})
		})

		app.get('/', (req, res) => {

			db.collection('quotes').find().toArray(function(err, result) {
				res.render('index.ejs', {quotes: result});
			})
		})

		app.post('/post', (req, res) => {
			db.collection('quotes').find().toArray(function(err, results) {
				res.send(results);
			})
		})

		app.put('/quotes', (req, res) => {
		db.collection('quotes')
		.findOneAndUpdate({name: 'Basavaraj'}, {
			$set: {
			name: req.body.name,
			quote: req.body.quote
			}
		}, {
			sort: {_id: -1},
			upsert: true
		}, (err, result) => {
			if (err) return res.send(err)
			res.send(result)
		})
		})

		app.listen(3000, () => {
		console.log('listening on 3000')
		})
})