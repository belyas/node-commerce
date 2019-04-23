const express = require('express');
const bodyParser = require('body-parser');
const path =  require('path');

const app = express();
const port = process.env.PORT || 8000;
// Routes
const indexRoute = require('./routes/web/index');
const errorController =  require('./controllers/error');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoute);

app.use(errorController.err404);

app.listen(port, () => console.log(`App listening on port ${port}`));