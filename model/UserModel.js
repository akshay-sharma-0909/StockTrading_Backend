const {model}= require("mongoose");
const {userSchema} = require("../schemas/UserSchema");

const UserModel = new model("usermodel", userSchema);


module.exports= UserModel;