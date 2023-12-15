const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());

 app.use(
     cors({
      allowedHeaders: [
        'X-ACCESS_TOKEN',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Origin',
        'x-requested-with',
        'Content-Type',
        'Content-Range',
        'Content-Disposition',
        'Content-Description',
      ],
         origin: ["http://localhost:3000", "http://localhost:3000/login"],
         methods: ["GET", "POST"],
         credentials: true,
   })
 );
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
    user: "user1",
    host: "host.docker.internal",
    password: "wREobe6BtzUN.0UZ",
    database: "melochord",
    
 });
 console.log(host);

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