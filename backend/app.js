const express=require('express')
const errorMiddleware=require('./middlewares/errors')
const cookieParser=require('cookie-parser')
const app=express()
app.use(express.json())
app.use(cookieParser())
const products=require('./routes/product')
const auths=require('./routes/auth')
const order = require('./routes/order')


app.use('/api/v1',products)
app.use('/api/v1',auths)
app.use('/api/v1',order)

//middleware to handle errors
app.use(errorMiddleware)
module.exports=app