const mongoose=require('mongoose')

const connectDatabase=()=>{

    mongoose.connect(process.env.DATABASE_URL).then(con=>{

        console.log(`The database started with : ${con.connection.host}`)
    
    })
}



module.exports=connectDatabase