var express = require('express');
var mongoose    =   require('mongoose');
var mongoSchema =   mongoose.Schema;
var ObjectId = mongoSchema.ObjectId;
var itemSchema = mongoSchema;

//var router = express.Router();

var itemSchema = function (mongoose)
 {

    var usersModel = require('./users.js');
    var UserSchema = usersModel.schema;

    var itemsSchema  = {
        _id: ObjectId,
        title: String,
        userId:  [{ type: ObjectId, ref: 'users' }],
      };

    return mongoose.model('Item', itemsSchema, 'item');
  };

module.exports = itemSchema;
