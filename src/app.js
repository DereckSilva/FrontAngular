const Redis = require('ioredis');
const redis = new Redis();
const express = require('express')
const cors = require('cors');

const app = express()

redis.subscribe('laravel_database_testessssssss', function(err, count) {
  console.log(`Inscrito em ${count} canais.`);
});

const coment = []

redis.on('message', function(channel, message) {
  coment.push(message)

})

app.use(cors()); // habilita o CORS para todas as solicitações

app.get('/teste', (req, res) => {
  
  res.json(coment);
})

app.listen(3000, () => {
  console.log(`Servidor Node.js ouvindo na porta 3000`);
});