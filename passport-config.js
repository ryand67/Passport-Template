const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const initialize = (passport, getUserByEmail) => {
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email);
        if(user === null) {
            return done(null, false, { message: 'No user with that email' });
        }

        if(bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' })
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serilizeUser((user, done) => { done(null, user.id) })
    passport.deserilizeUser((id, done) => { 
        done(null, getUserById(id));
    })
}

module.exports = initialize;