var express = require('express');
var app = express();
// to pass requests and responses
var bodyParser = require('body-parser');
// used to parse the body, i.e. json

var mongoose = require('mongoose');
// load the library
mongoose.connect('mongodb://localhost/blogfall2016');
// connects the instance to the database, can use Schemas and Models...

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  // note "{type: ...}" configures as an object with values, functions, etc..
  body: String,
  tag: {type: String, enum: ['POLITICS', 'EDUCATION', 'ECO  NOMY']},
  posted: {type: Date, default: Date.now}
}, {collection: 'post'});
// creates validation, makes structure for the data that's fetched or entered
// names mongo dbs collection

var PostModel = mongoose.model("PostModel", PostSchema)
// actually API that allows interaction with the database--delete, add, edit
// validated against the PostSchema

app.use(express.static(__dirname + '/public'));
// location where static info is held, facing the user
app.use(bodyParser.json());
// turns on the json parser
app.use(bodyParser.urlencoded({ extended: true }));
// parses json out of the body
app.post("/api/blogpost", createPost);
// listening to request, mapped to local function to handle request

app.get("/api/blogpost", getAllPosts);
// listening for incoming get requests

  function getAllPosts(req, res){
    PostModel
        .find()
        .then(
          function(posts){
            res.json(posts);
          },
          function(err){
            res.sendStatus(400);
          }
        );
  }
  // retrieves all the posts from the database and sends it back to the client

  function createPost(req, res) {
    var post = req.body;
    console.log(post);
    PostModel
        .create(post)
        .then(
            function(postObj) {
              res.json(200);
            },
            function(error) {
              res.sendStatus(400);
            }
            // returns either a successful and failed callback function
        );
}
// local function implemented to recieves a request and response,
// so it can participate in request response cycle between the client and the server

app.listen(3000);
