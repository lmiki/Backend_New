var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var mongoose    =   require('mongoose');

var router = express.Router();
var MongoSchema = mongoose.Schema;
var ObjectId = MongoSchema.ObjectId;

var db = mongoose.connect('mongodb://localhost:27017/local');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var itemsSchema  = new MongoSchema({
  _id: ObjectId,
  title: String,
  userId:  [{ type: ObjectId, ref: 'users' }],
});

var userSchema  = new MongoSchema({
  _id:  [{ type: ObjectId, ref: 'items' }],
  name: String,
});

var user  = mongoose.model('user', userSchema);
var item = mongoose.model('item', itemsSchema);

router.route('/items')
    .get(function (req, res) {
        var response = {};

        //item.find({}).populate('user').exec(function (err, items) {
        user.aggregate([
          {
            $lookup:
            {
              from: 'items',
              localField: '_id',
              foreignField: 'userId',
              as: 'items'
            }
          }
        ]).exec(function (err, items) {
          if (err) {
            response  = { error: true, message: 'Error fetching data' };
          } else {
            response = { message: items };
          }

          res.json(response);
        });
      });


app.use('/', router);

app.listen(4000);
console.log('Listening to PORT 4000');
