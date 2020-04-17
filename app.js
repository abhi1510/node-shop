const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const config = require('./config');
const locals = require('./middlewares/locals');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
const store = new MongoDBStore({
    uri: config.mongodbURI,
    collection: 'sessions'
})
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.sessionSecret, resave: false, saveUninitialized: false, store: store
}));
app.use(csrfProtection);
app.use(flash());

app.use(locals.resLocals);
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(mainRoutes);

mongoose.connect(config.mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('Connected to mongodb')
        app.listen(3000);
    })
    .catch(err => console.log('Error connecting mongodb', err));
