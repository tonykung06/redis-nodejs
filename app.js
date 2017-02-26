const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();

app.get('/:name', (req, res) => {
	const rand = Math.floor(Math.random() * 3) + 1;
	client.get('g' + rand, (err, greeting) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(`${greeting}, ${req.params.name}`);
	});
});

app.get('/set/:key/:val', (req, res) => {
	client.set(req.params.key, req.params.val, (err, data) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.redirect(`/get/${req.params.key}`);
	});
});

app.get('/get/:key', (req, res) => {
	client.get(req.params.key, (err, data) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(`${req.params.key}: ${data}`);
	});
});

const greetings = ['g1', 'Hello', 'g2',  'Hi there', 'g3', 'Howdy'];
client.mset(greetings, (err, data) => {
	if (!err) {
		app.listen(3000);
	}
});
