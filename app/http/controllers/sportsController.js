const Sports = require('../../models/sports')
function sportsController() {
    return {
       async index(req, res) {
            const products= await Sports.find()
            return res.render('sports', { products: products })
        }
    }
}

module.exports = sportsController