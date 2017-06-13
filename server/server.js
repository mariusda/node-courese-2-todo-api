const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose'); // database initialization
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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

// PUT /todos/:id
// Documentation https://docs.mongodb.com/v3.2/reference/method/db.collection.findOneAndUpdate/
// app.put('/todos/:id',(req,res)=>{
//   var id = req.params.id;
//   if (!ObjectID.isValid(id)){
//     return res.status(400).send();
//   };
//   Todo.findOneAndUpdate({_id:id},{$set:{completed:true},$currentDate:{completedAt:true}},{new:true})
//   .then(
//     (todo)=>{
//       res.send({todo});
//     })
//   .catch((err)=>{
//     return res.status(400).send();
//   });
// });

// PATCH /todos/:id
app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
    if (!ObjectID.isValid(id)){
      return res.status(400).send();
    };
  var body = _.pick(req.body,['text','completed']);

if (_.isBoolean(body.completed) && body.completed ){
  body.completedAt = new Date(Date.now()).toISOString();
  } else {
  body.completedAt = null;
}

Todo.findByIdAndUpdate(id,{$set:body},{new:true})
.then((todo)=>{
  if(!todo){
    res.status(404).send();
  }
    res.send({todo:todo});
  })
  .catch((err)=>{
    res.status(400).send(err);
  });

});


// We will export the app to use it from the tests/server.test.js
module.exports = {app};
app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});
