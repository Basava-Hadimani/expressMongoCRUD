const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require( '../../DBconfig/dbConfig');
const dbRequestURL =  require('../dbRequestURL');


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));

var db

MongoClient.connect(dbConfig.loginData,{ 
    useNewUrlParser: true 
    }, (err, client) => {
		if (err) return console.log(err)
		db = client.db(dbConfig.dbName); 
		app.post('/quotes', (req, res) => {
			console.log(req.body);
			db.collection('quotes').save(req.body, (err, result) => {
			if (err) return console.log(err);
				console.log('saved to database')
				res.redirect('/')
			})
		})

		app.get('/', (req, res) => {

			db.collection('quotes').find().toArray(function(err, result) {
				res.render('index.ejs', {quotes: result});
			})
		})

		app.post(dbRequestURL.saveBook, (req, res) => {
			db.collection(dbConfig.tableName).find().toArray(function(err, results) {
				res.send(results);
			})
		})

		app.put('/quotes', (req, res) => {
		db.collection('quotes')
		.findOneAndUpdate({name: 'asds'}, {
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

		app.delete('/quotes', (req, res) => {
			db.collection('quotes').findOneAndDelete({name: req.body.name},
			(err, result) => {
			if (err) return res.send(500, err)
			res.send({message: 'Data is deleted'})
			})
		})

		app.listen(3000, () => {
		console.log('listening on 3000')
		})
})