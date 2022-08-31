const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')



const userSchema=new mongoose.Schema({

    name: {
        type: String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Name cannot exceed 30 characters'],
        },

    email: {
        type: String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email address']
        },
    password: {
        type: String,
        required:[true,'Please enter your password'],
        minLength:[6,'Password must be at least 6 characters long'],
        select:false
        },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true
        }
        },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
        },
    resetPasswordToken: String,
    resetPasswordExpires: Date
    
})

//encrypt password before save

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next()
    }

    this.password=await bcrypt.hash(this.password,10)

})
//return JWT token

userSchema.methods.getJwtToken = function(){

    return JWT.sign({id:this._id},process.env.JWT_SECRET,{

        expiresIn:process.env.JWT_EXPIRES_TIME
    })

}

module.exports=mongoose.model('User',userSchema);