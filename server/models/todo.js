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
  completedAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = {Todo};
