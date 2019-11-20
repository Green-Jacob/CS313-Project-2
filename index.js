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
    var sql = "Select * FROM test_table";
    pool.query(sql, function(err, result) {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
      }
      console.log("Back from DB with result:");
      console.log(result.rows);
    });
  })
  .get('/getPerson', function(req, res){
    var id = req.query.id;
    var returned = function getPerson(err, data){
      if (err) {
        console.log("It broken");
        console.log(err);
      }
      console.log(data);
    };
    returned(query);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function query(callback) {
  const pool = new Pool({connectionString: connectionString});
  var sql = "SELECT * FROM person WHERE id=" + callback;
  pool.query(sql, function(err, result){
    if (err) {
      console.log("Error in query: ");
      console.log(err);
    }
    console.log("Here's the thing:");
    console.log(result.rows);
    callback(null, result.rows);
  })
}
