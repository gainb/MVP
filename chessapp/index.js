const express = require('express');
const db = require('./server/db.js');
const path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors');

const app = express();

let session;

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "secretkey",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.post('/regacc', (req, res) => {
  db.createAcc(req.body.username, req.body.password, req.body.chessName, (err, resp) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(resp);
    }
  })
})

app.post('/login', (req, res) => {
  db.login(req.body.username, req.body.password, (err, resp) => {
    if (err) {
      res.status(404).send(err);
    } else {
      if (resp.length !== 0) {
        session=req.session;
        session.userid=req.body.username;
        session.chessname = resp[0].chessname;
        console.log(req.session);
        res.send(req.session);
      } else {
        res.send([]);
      }
    }
  })
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

let port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});