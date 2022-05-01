const homeController=require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
const electronicsController=require('../app/http/controllers/electronicsController')//
const mobilesController=require('../app/http/controllers/mobilesController')//
const clothesController=require('../app/http/controllers/clothesController')//
const groceryController=require('../app/http/controllers/groceryController')//
const sportsController=require('../app/http/controllers/sportsController')//
const foodController=require('../app/http/controllers/foodController')//

//middlewares
const guest=require('../app/http/middlewares/guest')
const auth=require('../app/http/middlewares/auth')
const admin=require('../app/http/middlewares/admin')


function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/electronics',electronicsController().index) //
    app.get('/mobiles',mobilesController().index)  //
    app.get('/clothes',clothesController().index)  //
    app.get('/grocery',groceryController().index)  //
    app.get('/sports',sportsController().index)  //
    app.get('/food',foodController().index)  //
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest, authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)
    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
    
 
    //customers routes
    app.post('/orders',auth,orderController().store)
    app.get('/customer/orders',auth,orderController().index)
    app.get('/customer/orders/:id',auth,orderController().show)
    //admin routes
    app.get('/admin/orders',admin,AdminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update)
    //admin order status

}

module.exports =initRoutes