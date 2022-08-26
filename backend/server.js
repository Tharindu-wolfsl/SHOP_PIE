const app=require('./app')
const dotenv=require('dotenv')
const database=require('./config/database')

//configure dotenv file

dotenv.config({path:'backend/config/config.env'})

database()
app.listen(process.env.PORT,()=>{

    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)

})