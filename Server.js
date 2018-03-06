var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var mongoose    =   require('mongoose');
var router = express.Router();
var db = mongoose.connection;
var MongoSchema = mongoose.Schema;
var ObjectId = MongoSchema.ObjectId;

mongoose.connect('mongodb://localhost:27017/local');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var userSchema  = new MongoSchema({
  _id:  [{ type: ObjectId, ref: 'items' }],
  name: String,
});

var itemsSchema  = new MongoSchema({
  _id: ObjectId,
  title: String,
  userId:  [{ type: ObjectId, ref: 'users' }],
});

var user  = mongoose.model('user', userSchema);
var item = mongoose.model('item', itemsSchema);

/*user.create({ name: 'Alex' }, { name: 'Hanan' }, { name: 'Eran' }, function (err, name) {
  if (err) return handleError(err);
});
var Alex = new User({ name: 'Alex' });*/

/*item.create({ title: 'One' }, { title: 'Two' }, { title: 'Three' },
 function (err, name) {
  if (err) return handleError(err);
});*/

router.route('/items')
    .get(function (req, res) {
        var response = {};
        /*1item.find({}).populate('user').exec(function (err, data) {*/
        item.find().exec(function (err, data) {
          if (err) {
            response.item  = { error: true, message: 'Error fetching data' };
          } else {
            response.item = { message: data };
          }
        });

        user.find().exec(function (err, data) {
          if (err) {
            response.user  = { error: true, message: 'Error fetching data' };
          } else {
            response.user =  { message: data };
          }

          res.json(response);
        });
      }); 

app.use('/', router);

app.listen(4000);
console.log('Listening to PORT 4000');
