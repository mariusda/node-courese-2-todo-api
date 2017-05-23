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

  // db.collection('Todo').find({_id:new ObjectID('59231592964cc05187f1bb85')}).toArray().then((docs)=>{
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log(err);
  // });

  db.collection('Users').find({name:'mariusda'}).toArray().then((res)=>{
    console.log('Todos number: ', JSON.stringify(res,undefined,2));
  },(err)=>{
    console.log(err);
  });

 db.close();
});
