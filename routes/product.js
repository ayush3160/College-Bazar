const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')


router.route('/getAll').get(productController.getAllProducts)
router.route('/createProduct').post(productController.createProduct)
router.route('/getUser').post(productController.getUserOfParticularProduct)
router.route('/cart/:id').get(productController.getCartItems)
router.route('/addtocart').post(productController.addItemToCart)
router.route('/getAllItemsOfUser/:id').get(productController.getAllProductsOfAUser)
router.route('/deleteItem/:id').get(productController.deleteItem)



module.exports = router