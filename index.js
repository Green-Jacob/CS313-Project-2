require('dotenv').config();
const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || 'postgres://urumsnimhestzf:ed9d4f490a23a8e9d1474c84d366681357010b19e3ef307b7204bdb072289c0c@ec2-174-129-253-144.compute-1.amazonaws.com:5432/dfvbbt9ju2co2t?ssl=true';

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/dbConnect', function(req, res){
    const pool = new Pool({connectionString: connectionString});
    var sql = "Select * FROM players ORDER BY id";
    pool.query(sql, function(err, result) {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
      }
      console.log("Back from DB with result:");
      console.log(result.rows);
      res.json(result.rows);
      res.end();
    });
  })
  .get('/addPlayer', function(req, res){
    var name = req.query.name;
    console.log(name);
    var gender = req.query.gender;
    console.log(gender);
    const pool = new Pool({connectionString: connectionString});
    var sql = "INSERT INTO players(name, gender) VALUES('" + name + "','" + gender +"')";
    pool.query(sql, function(err, result) {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        res.send(false);
      }
      res.send(true);
    });
  })
  .get('/removePlayer', function(req, res){
    var id = req.query.id;
    console.log("Remove ID: " + id);
    const pool = new Pool({connectionString: connectionString});
    var sql = "DELETE FROM players WHERE id='" + id + "'";
    pool.query(sql, function(err, result) {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        res.send(false);
      }
      res.send(true);
    });
  })
  .get('/updateLevel', function(req, res){
    var id = req.query.id;
    var newLevel = req.query.newLevel;
    console.log("Update Level ID: " + id);
    const pool = new Pool({connectionString: connectionString});
    var sql = "UPDATE players SET level = " + newLevel + " WHERE id = " + id;
    console.log("Update Level SQL: " + sql);
    pool.query(sql, function(err, result){
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        res.send(false);
      }
      res.send(true);
    })
  })
  .get('/updateEquipment', function(req, res){
    var id = req.query.id;
    var newEquipment = req.query.newEquipment;
    console.log("Update Level ID: " + id);
    const pool = new Pool({connectionString: connectionString});
    var sql = "UPDATE players SET equipment = " + newEquipment + " WHERE id = " + id;
    console.log("Update Equipment SQL: " + sql);
    pool.query(sql, function(err, result){
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        res.send(false);
      }
      res.send(true);
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
