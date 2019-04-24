require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Routes
import indexRoute from './routes/web/index';
import categoryRouer from './routes/web/category';
import errorController from './controllers/error';
// Middlewares
import isAuth from './middlewares/is-auth';

const app = express();
const port = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoute);
app.use('/categories', categoryRouer);
app.use('/products', isAuth, (req, res, next) => {
    next();
});

app.use(errorController.err404);

app.listen(port, () => console.log(`App listening on port ${port}`));