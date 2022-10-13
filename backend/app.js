import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require('./routes/note'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/user'));


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Example app listening on port ', app.get('port'));
});

// Conexión base de datos
const uri = 'mongodb://localhost:27017/paramed';
const options = {useNewUrlParser: true};

mongoose.connect(uri, options).then(
  () => { console.log('Conectado a DB') },
  err => { console.log(err) }
)