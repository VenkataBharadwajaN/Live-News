const express=require('express')

const sports=express.Router();

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

const fetch = require('node-fetch');

sports.use(express.json())

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        sportsObject=databaseObj.collection("Sports");
        console.log("Connected To Sports DataBase Successfully");
    }
})

setInterval(()=>
    {
        let sportsurl=process.env.SPORTSURL

        fetch(sportsurl)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Sports Articles ");
            sportsObject.deleteMany({});
            sportsObject.insertMany(data['articles']);
        })
        .catch(err => {
            console.log("Error In Getting Sports Articles",err.message);
        });
    },1800000);

sports.get("/getsportsArticles",expressAsyncHandler( async (req,res) => {
    
    let sportsData=await sportsObject.find().toArray();
    
    res.send({message:sportsData});

}))

sports.get("/getFewsportsArticles",expressAsyncHandler( async (req,res) => {
    
    let sportsData=await sportsObject.find().limit(10).toArray();

    res.send({message:sportsData});

}))

sports.get("/:id",expressAsyncHandler( async (req,res) => {
    
    let id=req.params.id;

    let ObjectId=require('mongodb').ObjectID;
    let searchId=new ObjectId(id);
    let sportsData=await sportsObject.findOne({ _id: searchId });

    res.send({message:sportsData});

}))

module.exports=sports