const {moviesModel} = require('../model/moviesPicturesCollection.js');
const {getPics} = require('../getMoviesMethod.js');

async function getPictures(req,res){
   if(!req.params.movieName || req.params.movieName===""){
        return res.status(400).json({message:"Please Enter the movie name"});
   }
   
    try{

        let data = await moviesModel.findOne({movieName : req.params.movieName});
        
        if(data){

            if(data.images.length>1)
                return res.status(200).json(data);
        }

      data = await getPics(req.params.movieName);
      await moviesModel.create({movieName: req.params.movieName , images:data});
      
      return res.status(200).json(data);

    }catch(err){
        console.log('ia m error',err)
        return res.status(400).json({errorMessage : err});
    }
}

module.exports = { getPictures };