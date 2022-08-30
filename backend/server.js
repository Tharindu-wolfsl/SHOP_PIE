const app=require('./app')
const dotenv=require('dotenv')
const database=require('./config/database')

//configure dotenv file

dotenv.config({path:'backend/config/config.env'})

database()
const server=app.listen(process.env.PORT,()=>{

    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)

}
)

//handle unhandle promise rejection

process.on('unhandledRejetion',err=>{

    console.log(`Error: ${err.message}`)
    console.log(`Stop server to to unhandle promise rejection`)

    server.close(()=>{
        process.exit(1);
    })

})