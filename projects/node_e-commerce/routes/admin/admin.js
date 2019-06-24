let express = require('express')
let router  = express.Router()

let Category = require('../product/models/Category')

router.get('/', function (req, res) {
    res.send('Admin Worked')
})

router.get('/add-category', function (req, res) {
    res.render('product/addcategory', { errors:  req.flash('addCategoryError'), 
                                        success: req.flash('addCategorySuccess') })
})

router.post('/add-category', function (req, res) {
    let newCategory = new Category()
    
    newCategory.name = req.body.category

    newCategory.save()
                .then(category => {
                    req.flash('addCategorySuccess', `Added ${ category.name }!`)

                    res.redirect('/api/admin/add-category')
                })
                .catch(error => {
                    console.log(`error: `, error);
                    
                    req.flash('addCategoryError', error)

                    res.redirect('/api/admin/add-category')
                })
})

module.exports = router