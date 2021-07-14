const express=require('express')

const science=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

const fetch = require('node-fetch');

science.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        scienceObject=databaseObj.collection("Science");
        console.log("Connected To Science DataBase Successfully");
    }
})

setInterval(()=>
    {
        let scienceurl=process.env.SCIENCEURL

        fetch(scienceurl)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Science Articles ");
            scienceObject.deleteMany({});
            scienceObject.insertMany(data['articles']);
        })
        .catch(err => {
            console.log("Error In Getting Science Articles",err.message);
        });
    },300000);

science.get("/getscienceArticles",expressAsyncHandler( async (req,res) => {
    
    let scienceData=await scienceObject.find().toArray();
    
    res.send({message:scienceData});

}))

science.get("/getFewscienceArticles",expressAsyncHandler( async (req,res) => {
    
    let scienceData=await scienceObject.find().limit(10).toArray();

    res.send({message:scienceData});

}))

science.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let scienceData=await scienceObject.findOne({ _id: searchId });

    res.send({message:scienceData});

}))

module.exports=science