const Product = require("../modules/Product")
const User = require("../modules/User")

const createProduct = async (req,res) => {
    try {
        const product = req.body;

        product.publishedAt = new Date();

        const result = new Product(product)

        const output = await result.save()

        res.status(201).send(result)
    } catch (error) {
        throw new Error(error)
    }
}

const getUserOfParticularProduct = async (req,res) => {
    try {
        const id = req.body.productId;

        const user = await Product.findById(id).populate('user')

        res.status(200).send({user : user.user})
    } catch (error) {
        throw new Error(error)
    }
}

const getCartItems = async (req,res) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id).populate('cart')

        res.send({cart : user.cart})
    } catch (error) {
        throw new Error(error)
    }
}

const addItemToCart = async (req,res) => {
    try {
        const id = req.body.productId;

        const userid = req.body.userId;

        const output = await User.findByIdAndUpdate(userid,{
            $push : {
                cart : id
            },
        })

        res.send({output})
    } catch (error) {
        throw new Error(error)
    }
}

const getAllProducts = async(req,res) => {
    try {
        const allProducts = await Product.find({}).populate('user')

        res.status(200).send({allProducts});
    } catch (error) {
        throw new Error(error)
    }
}

const getAllProductsOfAUser = async(req,res) => {
    try {
        const {id} = req.params;

        const products = await Product.find({user : id})

        res.status(200).send({products})
    } catch (error) {
        throw new Error(error)
    }
}

const deleteItem = async(req,res) => {
    try {
        const {id} = req.params;

        const products = await Product.deleteOne({_id : id})

        res.status(200).send({msg : "Item Deleted"})
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createProduct,
    getUserOfParticularProduct,
    getCartItems,
    addItemToCart,
    getAllProducts,
    getAllProductsOfAUser,
    deleteItem
}