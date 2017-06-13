var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose'); // database initialization
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 8080;
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//  https://github.com/expressjs/body-parser
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// POST a todo on url /todos
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

// GET /todos
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

// GET /todos/:id  by id
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(400).send();
  };
    Todo.findById({_id:id}).then(
      (todo)=>{
        if (!todo) {
          return res.status(404).send();
        };
      res.send({todo});
    }).catch((err)=>{
      res.status(400).send(err);
    });
});

// DELETE /todos/:id
app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(400).send();
  };
  Todo.findByIdAndRemove({_id:id}).then(
    (todo)=>{
      if(!todo){
        return res.status(404).send();
      };
      res.send({todo});
    },(err)=>{
      res.status(400).send();
    }
  );


});

// We will export the app to use it from the tests/server.test.js
module.exports = {app};
app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});
