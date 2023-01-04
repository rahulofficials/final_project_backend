const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { dataModel } = require("./dataModel");
const {cardsModel} = require("./cardsModel");
const req = require("express/lib/request");
const res = require("express/lib/response");



const app = express();
app.use(express.static(__dirname.replace(/\\/g, "/") + '\view\dist')) 

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// LOGIN API

username="admin@gmail.com";
password="admin1234";


// TOKEN VERIFY 

function verifyToken(req,res,next)
{
    if(!req.headers.authorization)
    {
        return res.status(401).send('Unauthorized request')    
    }
    let token = req.headers.authorization.split('')[1]
    if (token=='null')
    {
        return res.status(401).send('Unauthorised request')
    }
    let payload=jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload)
    {
      return res.status(401).send('Unauthorized request')
    }

req.userId=payload.subject
next()
}


// LOGIN API

app.post("/app/login",(req,res)=>{
    let userData = req.body
console.log("userData",userData)
if (username!=userData.uname) {
    res.status(401)
    console.log("invalid User")
    
} else 
    if (password!=userData.password) {
        res.status(401)
        console.log("invalid password")
        
        
    } else {
        let payload={subject:username+password}
        let token=jwt.sign(payload,'secretKey')
        console.log(token)
        res.status(200).send({token})

        
    }
    


})





// DATABASE

const url ="mongodb+srv://rahul1234:rahul1234@cluster0.oyxsjqp.mongodb.net/projectdb?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true})



// ADD TICKET DATA API

app.post("/app/addData",(req,res)=>{
    var data = req.body
    console.log(data)
    const dataObject = new dataModel(data)
    dataObject.save(
        (error,data)=>{
            if (error) {
                res.send("Something Went Wrong")
                
            } else {
                res.send(data)
            }
        }
    )

})





// TICKETS VIEW API

app.get("/app/dataview",(req,res)=>{
    dataModel.find(
        (error,data)=>{
            if (error) {
                res.send("Something Went Wrong")
                
            } else {
                res.send(data)
            }

        }
    )
    
})





// DELETE TICKET API

app.post('/app/deleteById',(req,res)=>{
    var data = req.body
    dataModel.remove(data,
        (error,data)=>{
        if (error) {
            res.send({"status":"error"})
            
        } else {
            res.send({"status":"Success","data":data})
        }
    })
})





// EDIT API 

app.get("/app/edit/:id", async (req,res)=>{   //error to be noted
 let id =req.params.id;
 let ValidId = mongoose.Types.ObjectId.isValid(id);
 if (ValidId) {
    try {
        let singleData = await dataModel.findById({_id:id})
        res.json({
            success:1,
            item:singleData
        })
    } catch (error) {
        res.json("Something Went Wrong While listing the Single Data ")
    }
 } else {
    res.json("Error in Fetching id")
 }

 console.log({id});
})





// UPDATE TICKETS API

app.put("/app/update/:id", async (req,res)=>{
    let id = req.params.id;
    let ValidId = mongoose.Types.ObjectId.isValid(id);
    if (ValidId) {
        try {
             await dataModel.findByIdAndUpdate({_id:id},{
                $set:req.body  
            })
            res.json({
                success:1
            })
        } catch (error) {
            res.json("Error in Updation")
        }
        
    } else {
        res.send("Something Went Wrong During Updation")
    }
   
})

// ..........................................................................................

// CARDS API'S

//ADD CARDS  API

app.post("/app/cards",(req,res)=>{
    var card = req.body
    console.log(card)
    const cardsObject = new cardsModel(card)
    cardsObject.save(
        (error,card)=>{
            if (error) {
                res.send("Something Went Wrong")
                
            } else {
                res.send(card)
            }

        }
    )
})


// VIEW CARDS API

app.get("/app/getcards",(req,res)=>{
    cardsModel.find(
        (error,card)=>{
            if (error) {
                res.send("something went wrong")
                
            } else {
                res.send(card)
            }
        }
    )

})




// PORT

app.listen(3000,()=>{
    console.log("Server Is Running")
})
