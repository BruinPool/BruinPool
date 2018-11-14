const express = require('express');
const bodyParser = require('body-parser');
const sha256 = require('js-sha256');
const path = require('path');
const db = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

app.get('/login', (req, res) => {
  req.query.password = sha256(req.query.password);
  db.login(req.query, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/rideList', (req, res) => {
  db.getList(req.query, req.query.type, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/rideList', (req, res) => {
  db.postRide(req.body.rideInfo, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put('/rideList', (req, res) => {
  console.log(req.body.entry)
  db.rideUpdate(req.body.entry, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete('/rideList', (req, res) => {
  const ride = JSON.parse(req.query.ride);
  db.rideDelete(ride._id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/emailValidation', (req, res) => {
  db.emailValidation(req.query.email, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/usernameValidation', (req, res) => {
  db.usernameValidation(req.query.username, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/phoneNumberValidation', (req, res) => {
  db.phoneNumberValidation(req.query.phoneNumber, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post('/signup', (req, res) => {
  req.body.password = sha256(req.body.password);
  db.checkAvailability(req.body.email, req.body.username, req.body.phoneNumber, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (result.length === 0) {
        db.post(req.body, (err, result) => {
          if(err) {
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      } else {
        res.sendStatus(200);
      }
    }
  });
});

app.post('/updateUser', (req, res) => {
  db.updateUser(req.body.email, req.body.username, req.body.vid_id, req.body.pull, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send(result);
    }
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});


app.listen(80, () => {
  console.log('listening on port 80!');
});