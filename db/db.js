const { Pool } = require('pg')
require('dotenv').config();

// Configuração do pool de conexão com o SupaBaseSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  
module.exports = pool