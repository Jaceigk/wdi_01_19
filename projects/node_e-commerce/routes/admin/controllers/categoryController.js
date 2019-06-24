let Category = require('../../product/models/Category')

module.exports = {
    addCategory: (params) => {
        return new Promise((resolve, reject) => {
            let category = new Category()
            category.name = params.name

            category.save()
                    .then( category => {
                        resolve(category)
                    } )
                    .catch( error => {
                        let errors = {}
                        errors.confirmation = false

                        if (error.code === 11000) errors.message = 'Category already exists'
                        else                      errors.message = error

                        reject(errors)
                    } )
        })
    }
}