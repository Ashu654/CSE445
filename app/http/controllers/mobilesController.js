const Mobiles = require('../../models/mobiles')
function mobilesController() {
    return {
       async index(req, res) {
            const products= await Mobiles.find()
            return res.render('mobiles', { products: products })
        }
    }
}

module.exports = mobilesController