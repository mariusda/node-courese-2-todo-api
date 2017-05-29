var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  text:{
      type:String,
      required:true,
      minlength:1,
      trim:true //remove trealing space
  },
  completed:{
    type:Boolean,
    default:false
  },
  beginedAt:{
    type:Date,
    default:Date.now
  },
  completedAt:{
    type:Date
  }

});

module.exports = {Todo};
