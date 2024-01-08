const {getPictures} = require('../controller/moviePictureGetter.js');

const express = require('express');
const Router = express.Router();


Router.get('/:movieName',getPictures);

module.exports = {Router};