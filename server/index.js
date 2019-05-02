import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import csrf from 'csurf';
import flash from 'connect-flash';
import connectMongodbSession from 'connect-mongodb-session';
// Routes
import HomeRoute, { CategoryRouter, AuthRouter } from './routes/web';
import { ErroController } from './controllers';
// Middlewares
import isAuth from './middlewares/is-auth';

dotenv.config();

// configure Mongo db store for session
const MongoDbStore = connectMongodbSession(session);
const store = new MongoDbStore({
    uri: process.env.NC_MONGO_DB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

const app = express();
const port = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store
}));
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();

    let message = req.flash('error');
    res.locals.errorMessage = message.length ? message[0] : null;
    res.locals.currentPath = req.baseUrl;

    next();
});

app.use(HomeRoute);
app.use('/auth', AuthRouter);
app.use('/categories', isAuth, CategoryRouter);
app.use('/products', isAuth, (req, res, next) => {
    next();
});

app.use(ErroController.err404);
// connect to db then launch the server
mongoose
    .connect(process.env.NC_MONGO_DB_URI, { useNewUrlParser: true })
    .then(res => {
        app.listen(port, () => console.log(`App listening on port ${port}`));
    })
    .catch(err => {
        console.log('[Mongoose connect Error]', err);
    });
