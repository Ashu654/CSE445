const Food = require('../../models/food')
function foodController() {
    return {
       async index(req, res) {
            const products= await Food.find()
            return res.render('food', { products: products })
        }
    }
}

module.exports = foodController