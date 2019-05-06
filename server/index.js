import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import methodOverride from 'method-override';
import csrf from 'csurf';
import flash from 'connect-flash';
import connectMongodbSession from 'connect-mongodb-session';
// Middlewares
import { LocalsMiddleware, UploadMiddleare, IsAuthMiddleware } from './middlewares';
// Routes
import HomeRoute,
{
    CategoryRouter,
    AuthRouter,
    ProfileRouter
} from './routes/web';
import { ErroController } from './controllers';

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride((req, res, next) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
    }

    // next();
}));
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
app.use(LocalsMiddleware);

app.use(HomeRoute);
app.use('/auth', AuthRouter);
app.use('/profile', IsAuthMiddleware, ProfileRouter);
app.use('/categories', IsAuthMiddleware, UploadMiddleare('categories').single('category_image'), CategoryRouter);
app.use('/products', IsAuthMiddleware, (req, res, next) => {
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
