var express = require('express');
var router = express.Router();
const pool = require('../db/db');
const { format } = require('date-fns');

router.get('/', async (req, res) => {
  try{
    const result = await pool.query('SELECT * FROM endereco_ip');
    let ips = result.rows
    res.render('listaIP', { ips, format })
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;