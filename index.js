const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://urumsnimhestzf:ed9d4f490a23a8e9d1474c84d366681357010b19e3ef307b7204bdb072289c0c@ec2-174-129-253-144.compute-1.amazonaws.com:5432/dfvbbt9ju2co2t?ssl=true";

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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
