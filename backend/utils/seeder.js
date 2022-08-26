const Product=require('../models/product')
const databaseConnect=require('../config/database')
const dotenv=require('dotenv')


const products=require('../data/product.json')
const connectDatabase = require('../config/database')

dotenv.config({path:`backend/config/config.env`})

databaseConnect()
const productSeeder=async ()=>{


    try{
        await Product.deleteMany();
        console.log("All products deleted!");
    
        await Product.insertMany(products);
        console.log("All products added!");

        process.exit()

    }
    catch(error){

        console.log(error.message)
        process.exit()

    }
  
}

productSeeder()

