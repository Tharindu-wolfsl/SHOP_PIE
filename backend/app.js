const express=require('express')
const errorMiddleware=require('./middlewares/errors')
const app=express()
app.use(express.json())
const products=require('./routes/product')
const auths=require('./routes/auth')


app.use('/api/v1',products)
app.use('/api/v1',auths)

//middleware to handle errors
app.use(errorMiddleware)
module.exports=app