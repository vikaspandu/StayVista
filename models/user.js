const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
    // password aur username passport-local-mongoose hamare liye automatic hi save kara deta hai, chaahe hum field ke ander mention kare ya chahe hum na kare...
})

userSchema.plugin(passportLocalMongoose); // ye hamare liye username, hashing, salting and hashed password inn sab ko automatically implement kar deta hai. 

module.exports = mongoose.model('User', userSchema)