const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const urlExists = require('url-exists');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const port=4200;

var jsonParser = bodyParser.json()
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movielistdor.firebaseio.com",
});

app.post('/login', jsonParser, function(req,res){
  let output;
  let secretkey='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
  admin.database().ref('/users')
      .once("value", function(snapshot) {
        snapshot.forEach(function(child) {
           if (snapshot.key=="users"){
             output=snapshot.val();
           }
        });
        let users=output["users"];
        let match=0;
        users.forEach(function(user){
            if (user.username==req.body.username){
              match+=1;
              if (user.password==md5(req.body.password))
              {
                return res.send({
                  id: '1',
                  username: 'admin',
                  token: jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 3000 }, 'shhhhh')
                 })

              }
              else{
                return res.status(500).send({
                  message: 'Username or password is incorrect'
              });
            }
          };
    });
      if(match==0){
        return res.status(500).send({
          message: 'Username or password is incorrect'
      });
    }
  });
});

app.post('/validateURL',jsonParser,async (req, res)=> {
  let urlcheck=req.body.url;
  let result=null;
  
  urlExists(urlcheck, function(err, exists) {
    if (exists==false){
      result=false;
    }
    return res.send({'result':result});
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname + '/dist/index.html')); // load the single view file (angular will handle the page changes on the front-end)
  });

  app.listen(port, () => console.log(`Server started on port ${port}`));