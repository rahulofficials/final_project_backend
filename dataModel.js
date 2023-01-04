const mongoose= require("mongoose")

const dataModel = mongoose.model("records",mongoose.Schema(
    {
        
        pName:{
            type:String,
            required:true,
            trim:true

        },
        pwrtime:
        {
            type:String,
            required:true
        },
        pwrtimet:
        {
            type:String,
            required:true
        },
        pticket:{
            type:Number,
            required:true
        },


    }
))

module.exports = {dataModel}