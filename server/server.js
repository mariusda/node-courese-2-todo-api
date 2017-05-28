var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); // database initialization
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//  https://github.com/expressjs/body-parser
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// POST a todo on url /todos
//
app.post('/todos',(req,res)=>{
  // console.log(req.headers['origin']);
  // console.log(req.headers['content-type']);
  var todo = new Todo();
  todo.text = req.body.text;

  todo.save().then(
    (todo)=>{
      res.send(todo)
    },
    (err)=>{
      res.status(400).send(err);
    });
});




app.listen(8080,()=>{
  console.log('Started on port 8080');
});
