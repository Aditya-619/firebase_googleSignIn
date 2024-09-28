const express = require('express');
const cors = require('cors');
const middleware = require('./middleware/auth.js');

const app = express();
const port = 8000;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true,
  }));

app.use(middleware.decodeToken);

app.get('/tasklist', (req, res) => {
    console.log('headers ===========> ', req.headers)
	return res.json({
		Tasks: [
			{
				title: 'Task1',
			},
			{
				title: 'Task2',
			},
			{
				title: 'Task3',
			},
		],
	});
});

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});