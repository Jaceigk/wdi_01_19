const express = require('express');
const router = express.Router();
const passport = require('passport')

let userController = require('../users/controllers/userController')
let signupValidation = require('./utils/signupValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hey class!!!');
});

router.get('/signup', function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    res.render('auth/signup', { errors: req.flash('errors'), error_msg: null })
});

router.post('/signup', signupValidation, function (req, res) {
    let errorValidate = req.validationErrors()

    if (errorValidate) {
        res.render('auth/signup', { error_msg: true, errorValidate: errorValidate, errors: [] })

        return
    }

    userController.signup(req.body)
                    .then( user => {
                        req.logIn(user, function (error) {
                            if (error) {
                                res.status(400).json({
                                    confirmation: false,
                                    message: error
                                })
                            } else {
                                res.redirect('/')
                            }
                        })
                    })
                    .catch( error => {
                        // create flash message
                        req.flash('errors', error.message)

                        return res.redirect(301, '/api/users/signup')
                    })
})

router.get('/signin', function (req, res) {
    console.log(`52: `, req.isAuthenticated());
    
    if (req.isAuthenticated()) {
        res.redirect('/')
    }

    res.render('auth/signin', { errors: req.flash('loginMessage') })
})

router.post('/signin', passport.authenticate('local-login', {
    successRedirect:  '/',
    failureRedirect: '/api/users/signinTest',
    failureFlash:    true
}))

router.get('/logout', function (req, res, next) {
    req.logout()

    res.redirect('/')
})

module.exports = router;