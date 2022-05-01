const Electronics = require('../../models/electronics')
function electronicsController() {
    return {
       async index(req, res) {
            const products= await Electronics.find()
            return res.render('electronics', { products: products })
        }
    }
}

module.exports = electronicsController