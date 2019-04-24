import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

// Routes
import HomeRoute, { CategoryRouter } from './routes/web';
import { ErroController } from './controllers';
// Middlewares
import isAuth from './middlewares/is-auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(HomeRoute);
app.use('/categories', CategoryRouter);
app.use('/products', isAuth, (req, res, next) => {
    next();
});

app.use(ErroController.err404);

app.listen(port, () => console.log(`App listening on port ${port}`));
