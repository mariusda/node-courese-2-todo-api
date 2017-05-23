const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
      return console.log('unable to connect to mongodb server');
  }

console.log('Connected to mongodn server');

// deleteMany
// db.collection('Todo').deleteMany({text:"To delete todo"}).then((res)=>{
//   console.log(res.n);
// });
// deleteOne
// db.collection('Todo').deleteOne({text:"To delete todo"}).then((res)=>{
//   console.log(res.result);
// });
// findOneAndDelete
// db.collection('Todo').findOneAndDelete({completed:false}).then((res)=>{
//   console.log(res);
// });
// db.collection('Users').deleteMany({name:"marius"}).then((res)=>{
//   console.log(res);
// });

db.collection('Users').findOneAndDelete({_id:new ObjectID("5923fc86eb887da091082e37")}).then((res)=>{
  console.log(res)
});


 db.close();
});
