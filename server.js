const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/person');
const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem');

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Welcome To My Hotel . How cam i Help you ?')
})



const personRoutes =  require('./routes/personRoutes');
const menuRoutes =  require('./routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(3000,()=>{
console.log('listining on port 3000');
})
