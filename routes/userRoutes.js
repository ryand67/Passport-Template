const express = require('express');
const router = express.Router();
const passport = require('passport');

const bcrypt = require('bcrypt');

const users = [];

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/register', (req, res) => {
    try {
        const hashedPass = bcrypt.hashSync(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            email: req.body.email,
            name: req.body.name,
            password: hashedPass
        })
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    console.log(users);
})

module.exports = router;