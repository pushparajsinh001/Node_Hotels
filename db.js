const mongoose = require('mongoose');


const mongoURl = "mongodb://127.0.0.1:27017/hotel" 

mongoose.connect( mongoURl,{
    useNewUrlParser : true
    
});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('Connected to Mongodb server');
});
db.on('disconnected',()=>{
    console.log('disconnected from Mongodb server');
});
db.on('error',(err)=>{
    console.log('error in connecting to Mongodb server');
});
module.exports = db;