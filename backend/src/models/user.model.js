import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from "crypto"
import { type } from 'os';
import { stringify } from 'querystring';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    refreshToken : {
        type : String
    },
    role: { 
        type: String, 
        enum: ['user', 'admin', 'scholar'], 
        default: 'user' 
    }
}, { 
    timestamps: true
});

userSchema.pre('save',function(next){
    if(!this.isModified('password'))  return;
    try {
        this.password =  bcrypt.hashSync(this.password,10);
    } catch (error) {
        throw error;
    }
})

userSchema.methods.isPasswordValid = function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRATION
        }
    )
}
    
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRATION
        }
    )
}

userSchema.methods.generateResetToken = function()
{
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPassTokenExpires = Date.now()+15*60*1000;

    return resetToken
}

const User = mongoose.model('User', userSchema);
export default User;