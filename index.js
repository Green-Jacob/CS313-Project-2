require('dotenv').config();
const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/dbConnect', function(req, res){
    const pool = new Pool({connectionString: connectionString});
    var sql = "Select * FROM players";
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
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
