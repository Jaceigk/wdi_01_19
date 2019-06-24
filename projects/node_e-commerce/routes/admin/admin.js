let express = require('express')
let router  = express.Router()

let categoryController = require('./controllers/categoryController')
let categoryValidation = require('./utils/categoryValidation')

router.get('/', function (req, res) {
    res.send('Admin Worked')
})

router.get('/add-category', function (req, res) {
    res.render('product/addcategory', { errors:  req.flash('addCategoryError'), 
                                        success: req.flash('addCategorySuccess') })
})

router.post('/add-category', categoryValidation, function (req, res) {
    categoryController.addCategory(req.body)
                .then(category => {
                    req.flash('addCategorySuccess', `Added ${ category.name }!`)

                    res.redirect('/api/admin/add-category')
                })
                .catch(error => {
                    req.flash('addCategoryError', error.message)

                    res.redirect('/api/admin/add-category')
                })
})

module.exports = router