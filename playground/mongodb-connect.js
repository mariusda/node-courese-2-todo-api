// https://github.com/mongodb/node-mongodb-native
// http://mongodb.github.io/node-mongodb-native/
//const MongoClient = require('mongodb').MongoClient;
// ES6 destructuring - see below
const {MongoClient,ObjectID} = require('mongodb');
//ES6 destructuring
// var user = {name:"Marius",age:43};
// var {name} = user;
// console.log(name);

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
      return console.log('unable to connect to mongodb server');
  }

  console.log('Connected to mongodn server');

  db.collection('Todo').insertOne({
    text:"To walk the monkey",
    completed:true
  },(err,res)=>{
    if (err) {
      return console.log('Unable to insert to todo ',err);
    }

    console.log(JSON.stringify(res.ops,undefined,2));

  });

  // db.collection('Users').insertOne({
  //   name:"marius",
  //   age:43,
  //   location:"Sibiu, Romania"
  // },(err,res)=>{
  //   if(err){
  //     return console.log('Can\'t add a user to mondodb',err);
  //   }
  //
  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,2));
  //
  // });



  db.close();
});
