import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        price : 1
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    stocks : {
        type : Number,
        required : true,
        default : 1
    },
    category : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const Product = mongoose.model("Product", productSchema)
export default Product