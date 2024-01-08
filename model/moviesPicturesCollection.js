const mongoose = require('mongoose');

const moviesCollectionSchema = new mongoose.Schema({
    movieName : String,
    images : {
        type:[String]
    }
},{timestamps:true})

const moviesModel = mongoose.model('moviesModel',moviesCollectionSchema);

module.exports = {moviesModel}