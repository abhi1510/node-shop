const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    return res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',        
    });    
}

exports.getSignup = (req, res, next) => {
    return res.render('auth/sign-up', {
        pageTitle: 'SignUp',
        path: '/signup',
    });    
}

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            console.log('Error signing out');
        }
        return res.redirect('/login');
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');    
        }
        bcrypt.compare(password, user.password)
        .then(matched => {
            if(matched) {
                req.session.isAuthenticated = true;
                req.session.user = user;
                return res.redirect('/products');
            }    
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        })        
    })
    .catch(err => console.log('Error siging in user', err));    
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    User.findOne({email: email})
    .then(user => {
        if(user) {
            req.flash('error', 'Email exists already. Please use a different one.');
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const newUser = new User({
                email: email,
                password: hashedPassword
            })
            return newUser.save();
        })
        .then(result => {
            return res.redirect('/login');    
        });
    })    
    .catch(err => console.log('Error signing up user', err));    
}

