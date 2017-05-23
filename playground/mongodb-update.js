const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
      return console.log('unable to connect to mongodb server');
  }

console.log('Connected to mongodn server');

// db.collection('Todo').findOneAndUpdate({_id:new ObjectID("5923f8f2eb887da091082e2b")},{$set:{completed:true}},{returnOriginal:false})
// .then((res)=>{
//   console.log(res);
// });

db.collection('Users').findOneAndUpdate({_id:new ObjectID("5922f80363e0e741d4b68399")},{$set:{name:"Marius"},$inc:{age:1}},{returnOriginal:false})
.then((res)=>{
  console.log(res);
});



 db.close();
});
