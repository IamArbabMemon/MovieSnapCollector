const {Router} = require('./routes/router.js');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

app.use('/api',Router);

try{

mongoose.connect(process.env.MONGO_URL);
app.listen(process.env.PORT,()=>{
    console.log('Server is listening');
})

}catch(err){
    console.log(err)
}




