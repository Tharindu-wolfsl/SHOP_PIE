const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please enter product name'],
        trim:true, //remove empty spaces
        maxLength:[100,'Product name cannot exceed 100 chracters'],
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        default:0.0, //remove empty spaces
        maxLength:[5,'Product price cannot exceed 5 chracters'],
    },
    description:{
        type:String,
        required:[true,'Please enter product description'],
    },
    ratings:{
        type:Number,
        default:0,
    },

    images:[
        {
                public_id:{
                    type:String,
                    required:true,
                },
                url:{
                    type:String,
                    required:true,
                },
        }

    ],

    category:{
        type:String,
        required:[true,'Please enter product category'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:'Please select correct category for product'
        }
    },
    seller:{
        type:String,
        required:[true,'Please enter products seller']
    },
    stock:{
        type:Number,
        required:[true,'Please enter products sellar'],
        maxLength:[5,'Stock cannot exceed 5 numbers'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {   
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true   
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true   
    },
    createdAt:{
        type:Date,
        default:Date.now
    }



})

module.exports=mongoose.model('Product',productSchema);