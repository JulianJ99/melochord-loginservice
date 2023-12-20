const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());

const cors = require('cors')
const corsOptions ={
    origin:['http://http://host.docker.internal:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))


app.use(function(req,res,next){  
  res.header('Access-Control-Allow-Origin','http://http://host.docker.internal:3000')  
  next(); 
})


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use (
    session ({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);


const db = mysql.createConnection({
    host: "mysqldb",
    user: "process.env.MYSQLDB_USER",
    password: "process.env.MYSQLDB_PASSWORD",
    database: "process.env.MYSQLDB_DATABASE",
 });
 console.log(db.host, db.user, db.password, db.database)
 db.connect(function(err){
  if(err) throw err;
  console.log('connected!');
});


app.post('/register', (req, res)=> {

    const username = req.body.username
    const password = req.body.password 

    bcrypt.hash(password,saltRounds, (err, hash) => {
        if (err) {
                 console.log(err)
             }
             
             db.query( 
                 "INSERT INTO users (username, password) VALUES (?,?)",
                 [username, hash], 
                 (err, result)=> {
                     console.log(err);
                 }
             );
         })
     });
 
     app.get("/login", (req, res) => {
        if (req.session.user) {
          res.send({ loggedIn: true, user: req.session.user });
        } else {
          res.send({ loggedIn: false });
        }
      });

app.post('/login', (req, res) => {
 const username = req.body.username;
 const password = req.body.password;
 
    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          
          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
            if (error) return callback(error);  
            if (response) {
                req.session.user = result;
                console.log(req.session.user);
                res.send(result);
              } else {
                res.send({ message: "Wrong username/password combination!"});
              }
            });
          } else {
            res.send({ message: "User doesn't exist" });
          }
        }
      );
    });
 
    const PORT = process.env.NODE_DOCKER_PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port `, PORT);
    });