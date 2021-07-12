const express=require('express')

const general=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.url;

const fetch = require('node-fetch');

general.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        generalObject=databaseObj.collection("General");
        console.log("Connected To General DataBase Successfully");
    }
})

setInterval(()=>
    {
        let generalurl=process.env.generalurl
        
        fetch(generalurl)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched General Articles ");
            generalObject.deleteMany({});
            generalObject.insertMany(data['articles']);
        })
        .catch(err => {
            console.log("Error In Getting General Articles",err.message);
        });

    },7200000);

general.get("/getgeneralArticles",expressAsyncHandler( async (req,res) => {
    
    let generalData=await generalObject.find().toArray();
    
    res.send({message:generalData});

}))

general.get("/getFewgeneralArticles",expressAsyncHandler( async (req,res) => {
    
    let generalData=await generalObject.find().limit(10).toArray();

    res.send({message:generalData});

}))

general.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let generalData=await generalObject.findOne({ _id: searchId });

    res.send({message:generalData});

}))

module.exports=general