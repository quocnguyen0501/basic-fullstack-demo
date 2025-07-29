require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9000;
const APP_NAME = process.env.APP_NAME || 'Todo App';

let todos = [];

app.use(cors());
app.use(express.json());

app.get('/info', (req, res) => {
	res.json({
		appName: APP_NAME,
		version: '1.0.0',
		port: PORT,
	});
});

app.get('/todos', (req, res) => {
	res.json(todos);
});

app.post('/todos', (req, res) => {
	const { text } = req.body;
	const newTodo = { id: Date.now(), text };
	todos.push(newTodo);
	res.json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	todos = todos.filter((todo) => todo.id !== id);
	res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
	console.log(`${APP_NAME} server is running on port ${PORT}`);
});
