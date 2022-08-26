const express=require('express')
const errorMiddleware=require('./middlewares/errors')
const app=express()
app.use(express.json())
const products=require('./routes/product')


app.use('/api/v1',products)

//middleware to handle errors
app.use(errorMiddleware)
module.exports=app