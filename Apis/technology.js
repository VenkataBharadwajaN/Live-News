const express=require('express')

const technology=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

const fetch = require('node-fetch');

technology.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        technologyObject=databaseObj.collection("Technology");
        console.log("Connected To Technology DataBase Successfully");
    }
})

setInterval(()=>
    {
        let technologyurl=process.env.TECHNOLOGYURL
        
        fetch(technologyurl)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Technology Articles ");
            technologyObject.deleteMany({});
            technologyObject.insertMany(data['articles']);
        })
        .catch(err => {
            console.log("Error In Getting Technology Articles",err.message);
        });
    },1800000);

technology.get("/gettechnologyArticles",expressAsyncHandler( async (req,res) => {
    
    let technologyData=await technologyObject.find().toArray();
    
    res.send({message:technologyData});

}))

technology.get("/getFewtechnologyArticles",expressAsyncHandler( async (req,res) => {
    
    let technologyData=await technologyObject.find().limit(10).toArray();

    res.send({message:technologyData});

}))

technology.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let technologyData=await technologyObject.findOne({ _id: searchId });

    res.send({message:technologyData});

}))

module.exports=technology