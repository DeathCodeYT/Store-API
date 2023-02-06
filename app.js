require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDB = require('./db/connect')
const app = express();
const {errorHandlerMiddleware} = require('./middleware/error-handler')
const {notFoundMiddleware} = require('./middleware/not-found')
const {productsRouter} = require('./routes/products')

// JSON middleware
app.use(express.json())

// Home Routes
app.get('/',(req,res)=>{
    res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">Products Link</a>')
})

//Routes
app.use('/api/v1/products',productsRouter)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// Port
const PORT = process.env.PORT || 3000

//Start Function
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{console.log(`Server is Listening on http://localhost:${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}

start()
