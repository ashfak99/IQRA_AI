import crypto from "crypto";

const genOTP= (len =6)=>{
    let otp = crypto
    .randomInt(Math.pow(10,len-1),Math.pow(10,len))
    .toString();
    return otp;
}

module.exports = genOTP;