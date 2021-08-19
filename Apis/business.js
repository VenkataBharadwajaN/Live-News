const express=require('express')

const business=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

const fetch = require('node-fetch');

business.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        businessObject=databaseObj.collection("Business");
        console.log("Connected To Business DataBase Successfully");
    }
})

setInterval(()=>
    {
        let businessurl=process.env.BUSINESSURL
        fetch(businessurl)
        .then(res => res.json())
        .then(data => {

            console.log("Fetched Business Articles ");
            if(data['status']=="ok")
            {
            businessObject.deleteMany({});
            businessObject.insertMany(data['articles']);
            }
            else
            {
                console.log(data);
                console.log("Issue in Updating Business Articles ");
            }
        })
        .catch(err => {
            console.log("Error In Getting Business Articles",err.message);
        });

    },1800000);

business.get("/getbusinessArticles",expressAsyncHandler( async (req,res) => {
    
    let businessData=await businessObject.find().toArray();
    
    res.send({message:businessData});

}))

business.get("/getFewbusinessArticles",expressAsyncHandler( async (req,res) => {
    
    let businessData=await businessObject.find().limit(10).toArray();

    res.send({message:businessData});

}))

business.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let businessData=await businessObject.findOne({ _id: searchId });

    res.send({message:businessData});

}))

module.exports=business