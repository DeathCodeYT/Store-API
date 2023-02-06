require('dotenv').config()

const connectDB = require('./db/connect')
const Products = require('./model/product-model')
const jsonProducts = require('./products.json')

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Products.deleteMany()
        await Products.create(jsonProducts)
        console.log("SUCCESS!!!!")
        process.exit(0)
    } catch (error) {
        console.log(error)        
        process.exit(1)
    }
}

start()