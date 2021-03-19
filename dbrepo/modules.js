var mongoose = require("mongoose");

let dbURI = "mongodb+srv://abc:abc@cluster0.whubo.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});


var userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "phone": String,
    "role": { "type": String, "default": "user"},
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var userModel = mongoose.model("foodusers", userSchema);

var resetPassword = new mongoose.Schema({
    "email": String,
    "otp": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var otpModel = mongoose.model("foodotp", resetPassword);

var orderSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "phone": String,
    "address": String,
    "total": String,
    "orders": Array,
    "createdOn": { "type": Date, "default": Date.now },
});
var orderModel = mongoose.model("orders", orderSchema);
var productSchema = new mongoose.Schema({
    "name": String,
    "image": String,
    "stock": Number,
    "price": Number,
    "description": String,
    "isAvailable": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var productModel = mongoose.model("products", productSchema);


module.exports = {
    userModel: userModel,
    otpModel: otpModel,
    orderModel: orderModel,
    productModel: productModel
}