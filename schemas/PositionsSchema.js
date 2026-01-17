const {Schema} = require("mongoose");

const PositionsSchema = new Schema({
    product: {
        type: String
    },
    name: {
        type: String
    },
    qty: {
        type: Number
    },
    avg: {
        type: Number
    },
    price: {
        type: Number
    },
    net: {
        type:String
    },
    day: {
        type: String
    },
    isLoss: {
        type:Boolean
    }
});

module.exports = {PositionsSchema};





