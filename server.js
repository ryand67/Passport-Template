if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const passport = require('passport');
const flash = requier('express-flash');
const session = require('express-session');

const users = []; //Used in place of db for now 

const initializePassport = require('./passport-config');
initializePassport(passport, email => {
    users.find(user => user.email === email);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/userRoutes'));

app.listen(3000, () => {
    console.log(`SERVER LIVE`);
})