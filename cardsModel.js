const mongoose=require("mongoose")

const cardsModel = mongoose.model("cards",mongoose.Schema(
    {
        place:{
            type:String,
            required:true,
            trim:true
        },
        image:{
            type:String,
            required:true,
            trim:true
        },
        detail:{
            type:String,
            required:true,
            trim:true
        },
    }
))

module.exports = {cardsModel}