const express=require('express')

const health=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

const fetch = require('node-fetch');

health.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        healthObject=databaseObj.collection("Health");
        console.log("Connected To Health DataBase Successfully");
    }
})

setInterval(()=>
    {
        let healthurl=process.env.HEALTHURL

        fetch(healthurl)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Health Articles ");
            healthObject.deleteMany({});
            healthObject.insertMany(data['articles']);
        })
        .catch(err => {
            console.log("Error In Getting Health Articles",err.message);
        });
    },7200000);

health.get("/gethealthArticles",expressAsyncHandler( async (req,res) => {
    
    let healthData=await healthObject.find().toArray();
    
    res.send({message:healthData});

}))

health.get("/getFewhealthArticles",expressAsyncHandler( async (req,res) => {
    
    let healthData=await healthObject.find().limit(10).toArray();

    res.send({message:healthData});

}))

health.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let healthData=await healthObject.findOne({ _id: searchId });

    res.send({message:healthData});

}))

module.exports=health