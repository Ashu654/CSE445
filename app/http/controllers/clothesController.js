const Clothes = require('../../models/clothes')
function clothesController() {
    return {
       async index(req, res) {
            const products= await Clothes.find()
            return res.render('clothes', { products: products })
        }
    }
}

module.exports = clothesController