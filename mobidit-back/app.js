const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const port = 3008;

const apiRoutes = require('./app/routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.get('/', (req, res) => {
	res.json({ message: 'API Rest Twitter' });
});

app.use('/api', apiRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});