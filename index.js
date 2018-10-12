const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.js');

try{
    mongoose.connect(config.mongoDBURI,{useNewUrlParser: true});
}
catch(err){
    throw err;
}


app.listen(config.port, ()=>{
    console.log(`Applicstion running on ${config.port}`)
});