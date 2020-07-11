const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "reactdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");
  
  app.get('/api/user', (req, res) => {
    con.query('SELECT * FROM user', function (error, results, fields) {
        if (err) throw err;
         res.end(JSON.stringify(results));
    });
});
 
app.post('/api/add', (req, res) => { 
var data = [req.body.post];
console.log(data);
  var sql = "INSERT INTO user (todo) VALUES (?)";
  con.query(sql,data, function (err, result) {
    if (err) throw err;
	res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
  console.log("Record inserted");
  });
  });
  
  app.post('/api/delete', (req, res) => { 
var data = [req.body.id];
console.log(data);
  var sql = "DELETE FROM user WHERE (id) = (?)";
  con.query(sql,data, function (err, result) {
    if (err) throw err;
	res.send(
    `I received your DELETE request. This is what you sent me: ${req.body.id}`,
  );
  console.log("Record deleted");
  });
  });
  
    app.post('/api/getById', (req, res) => { 
var data = [req.body.id];
console.log(data);
  var sql = "SELECT todo FROM user WHERE id = (?)";
  con.query(sql,data, function (err, result) {
    if (err) throw err;
	res.end(JSON.stringify(result));
  console.log("Record selected:", result);
  });
  });
  
   app.post('/api/update', (req, res) => { 
var data = [req.body.personAge, req.body.id];
console.log(data);
  var sql = "UPDATE user SET todo = (?) WHERE id = (?)";
  con.query(sql,data, function (err, result) {
    if (err) throw err;
	res.send(
    `I received your UPDATE request. This is the id updated ${req.body.id}`,
  );
  console.log("Record updated");
  });
  }); 
  
   app.post('/api/done', (req, res) => { 
var data = [req.body.id];
console.log(data);
  var sql = "UPDATE user SET complete = (1) WHERE id = (?)";
  con.query(sql,data, function (err, result) {
    if (err) throw err;
	res.send(
    `I received your COMPLETE request. This is the id updated ${req.body.id}`,
  );
  console.log("Record completed");
  });
  }); 
  
     app.post('/api/undone', (req, res) => { 
var data = [req.body.id];
console.log(data);
  var sql = "UPDATE user SET complete = (0) WHERE id = (?)";
  con.query(sql,data, function (err, result) {
    if (err) throw err;
	res.send(
    `I received your COMPLETE request. This is the id updated ${req.body.id}`,
  );
  console.log("Record incompleted");
  });
  }); 
  
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));