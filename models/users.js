
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local');
var mongoSchema =   mongoose.Schema;
var ObjectId = mongoSchema.ObjectId;

//var router = express.Router();

var userSchema = function (mongoose)
{
  var userSchema  = {
    _id: ObjectId,
    name: String,
  };

  /*var itemsSchema  = {
  _id: ObjectId,
  title: String,
  userId:  [{ type: ObjectId, ref: 'users' }],
};*/

  return mongoose.model('users', userSchema, 'user');
};

////module.exports = mongoose.model('users', userSchema);
module.exports = userSchema;
