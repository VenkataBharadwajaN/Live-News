const express=require('express')

const covid=express.Router();

covid.use(express.json())

const fetch = require('node-fetch');

const expressAsyncHandler=require('express-async-handler')

const mc = require('mongodb').MongoClient;

require('dotenv').config()

const url = process.env.URL;

mc.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err,client)=>{

    if(err)
    {
        console.log("Error In Database Connection",err);
    }
    else
    {
        let databaseObj=client.db('NewsDatabase');
        covidDataObject=databaseObj.collection("CovidData");
        console.log("Connected To CovidData DataBase Successfully");
    }
})

setInterval( ()=>
    
    {       
        let covidurl=process.env.COVIDURL

        fetch(covidurl)
        .then(res => res.json())
        .then(data => {

            console.log("Covid Data Fetched Successfully");

            for (let i = 0; i < data['statewise'].length; i++)
            {   
                covidDataObject.updateOne({statecode:data['statewise'][i]["statecode"]},{$set:{...data['statewise'][i]}});
            }

            console.log("Covid Data Updated Successfully");

        })

        .catch(err => {
            console.log(err.message);
        });

    },7200000);

covid.get("/getcovidData",expressAsyncHandler( async (req,res) => {
    
    let covidData=await covidDataObject.find().toArray();

    res.send({message:covidData});

}))

module.exports=covid
