const express=require('express')

const app=express()

const path=require('path')

app.use(express.json())

require('dotenv').config()

app.use(express.static(path.join(__dirname,'./dist/livenews')))

const business=require('./Apis/business')
const covid=require('./Apis/covid')
const entertainment=require('./Apis/entertainment')
const general=require('./Apis/general')
const health=require('./Apis/health')
const science=require('./Apis/science')
const sports=require('./Apis/sports')
const technology=require('./Apis/technology')

app.use('/business',business)
app.use('/covid',covid)
app.use('/entertainment',entertainment)
app.use('/general',general)
app.use('/health',health)
app.use('/science',science)
app.use('/sports',sports)
app.use('/technology',technology)

app.use((req,res,next)=>{
    console.log("Error Here-1");
    res.send({message:`Path ${req.url} Not Found`})
})

app.use((err,req,res,next)=>{
    console.log("Error Here-2");
    res.send({message:`${err.message}`})
})

const port=process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server Working On Port No ${port} ...`);
})
