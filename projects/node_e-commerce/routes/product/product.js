const express = require('express')
const router  = express.Router()

let Category = require('./models/Category')

router.get('/', function (req, res) {
    res.send('product page')
})

router.get('/addcategory', function (req, res) {
    res.render('product/addcategory', { errors:  req.flash('addCategoryError'), 
                                        success: req.flash('addCategorySuccess') })
})

router.post('/addcategory', function (req, res) {
    let newCategory = new Category()
    
    newCategory.name = req.body.category

    newCategory.save()
                .then(category => {
                    req.flash('addCategorySuccess', 'Success!!!!')

                    res.redirect('/api/product/addcategory')
                })
                .catch(error => {
                    req.flash('addCategoryError', error)

                    res.redirect('/api/product/addcategory')
                })
})

module.exports = router