const expect = require('expect'); // test assertion
const request = require('supertest'); // test routes

const {Todo} = require('./../models/todo');
const {app} = require('./../server');

const todos = [{text:'First todo in the list'},{text:'Second todo in the list'}];


var text = 'new to do test';

// beforeEatch willbe called before eatch tests are run
beforeEach((done)=>{
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(()=>{done()});
});

describe('POST /todos',()=>{
  // we use mocha module to construct the tests
  // because we call an asincroniuos function we expect that
  // we get the done back when the test is over
  it('shoud create a new to do',(done)=>{
  //  var text = 'new to do test';

    request(app)
      .post('/todos')
      .send({text})     // we use es6 sintax {text:text} is the same as {text}
      .expect(200)      // int he previous steps we have made the request , from here we will make the assertions
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
          if (err) {
            return done(err); // because the function is async we must return the done and will have the err as an argument
          };

          Todo.find({text}).then((todos)=>{
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e)=>{done(e)}); // if the length or the text is not ok the catch statement will return the error

        });
      });

      it('should not create a new todo',(done)=>{
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
          if(err){return done(err);};

          Todo.find().then((res)=>{
            expect(res.length).toBe(2);
            done();
          }).catch((e)=> done(e)); // catch errors for the find

        });
      });
});

describe('GET /todoes',()=>{

  it('shoud return todos from GET /todos route',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end((err)=>{done(err)});

  });

});
