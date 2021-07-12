const express=require('express')

const entertainment=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

const fetch = require('node-fetch');

entertainment.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        entertainmentObject=databaseObj.collection("Entertainment");
        console.log("Connected To Entertainment DataBase Successfully");
    }
})

setInterval(()=>
    {
        let entertainmenturl=process.env.ENTERTAINMENTURL

        fetch(entertainmenturl)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Entertainment Articles ");
            entertainmentObject.deleteMany({});
            entertainmentObject.insertMany(data['articles']);
        })
        .catch(err => {
            console.log("Error In Getting Entertainment Articles",err.message);
        });

    },7200000);

entertainment.get("/getentertainmentArticles",expressAsyncHandler( async (req,res) => {
    
    let entertainmentData=await entertainmentObject.find().toArray();
    
    res.send({message:entertainmentData});

}))

entertainment.get("/getFewentertainmentArticles",expressAsyncHandler( async (req,res) => {
    
    let entertainmentData=await entertainmentObject.find().limit(10).toArray();

    res.send({message:entertainmentData});

}))

entertainment.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let entertainmentData=await entertainmentObject.findOne({ _id: searchId });

    res.send({message:entertainmentData});

}))

module.exports=entertainment