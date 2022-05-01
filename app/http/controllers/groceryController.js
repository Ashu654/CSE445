const Grocery = require('../../models/grocery')
function groceryController() {
    return {
       async index(req, res) {
            const products= await Grocery.find()
            return res.render('grocery', { products: products })
        }
    }
}

module.exports = groceryController