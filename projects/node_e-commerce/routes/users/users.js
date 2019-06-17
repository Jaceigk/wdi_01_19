const express = require('express');
const router = express.Router();

let userController = require('../users/controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hey class!!!');
});

router.get('/signup', function(req, res, next) {
    res.render('auth/signup', { errors: req.flash('errors') })
});

router.post('/signup', function (req, res) {
    userController.signup(req.body)
                    .then( user => {
                        res.redirect('/')
                    })
                    .catch( error => {
                        console.log(error)

                        // create flash message
                        req.flash('errors', error.message)

                        return res.redirect(301, '/api/users/signup')
                    })
})

router.get('/signin', function (req, res) {
    res.render('auth/signin', { errors: [] })
})

module.exports = router;

/**
 * {
    "_id" : "djlSbNXvdow58wEf0vLJ77PMCPYYdabF",
    "expires" : ISODate("2019-07-01T19:46:44.266Z"),
    "session" : "{\"cookie\":{\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"testError\":[\"hello\",\"hello\"],\"testError2222\":[\"hello2222\"]}}"
}
 */