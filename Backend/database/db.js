// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'IDEXIOT',
  host: 'iotdatabase.crgueac0kegh.ap-south-1.rds.amazonaws.com',
  database: 'IDEX-IOT',
  password: "12345678",
  port: 5432,
  ssl:{
    rejectUnauthorized:false
  }
});






module.exports = pool;
