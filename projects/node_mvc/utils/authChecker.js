function authChecker(req, res, next) {
    firstNameChecker(req)
    lastNameChecker(req)
    userNameChecker(req)
    emailChecker(req)
    passwordChecker(req)

    let errors = req.validationErrors()
    
    if (errors) {
        res.render('register', { error_msg: true, errors: errors })
    } else {
        next()
    }
}

function firstNameChecker(firstName) {
    firstName.check('firstName').notEmpty().withMessage('Please enter a first name').isLength({ min: 3, max: 15 }).withMessage('First name must be betweeen 3 and 15 characters').blacklist(/<>\//)
}

function lastNameChecker(lastName) {
    lastName.check('lastName').notEmpty().withMessage('Please enter a last name').isLength({ min: 3, max: 15 }).withMessage('Last name must be betweeen 3 and 15 characters').blacklist(/<>\//)
}

function userNameChecker(username) {
    username.check('username').notEmpty().withMessage('Please enter a username').isLength({ min: 3, max: 15 }).withMessage('Username must be betweeen 3 and 15 characters').blacklist(/<>\//)
}

function emailChecker(email) {
    email.check('email').isEmail().withMessage('Please enter a valid email')
}

function passwordChecker(password) {
    password.check('password').notEmpty().withMessage('Password can not be empty')

    password.checkBody('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d`~!@#$%^&*()_+]{5,10}$/).withMessage('Minimum 5 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character')

    password.checkBody('password2').notEmpty().withMessage('Confirm password can not be empty').equals(password.body.password).withMessage('Passwords must match')
}

module.exports = authChecker