require('dotenv').config();
const express = require ('express');
//const { response } = require('express');
const app = express();
const sequelize= require('./db');




sequelize.sync();
//sequelize.sync({force: true})
app.use(express.json());
app.use(require('./middleware/headers'))

const user= require('./controllers/usercontroller');
app.use('/user', user);

const workout =require('./controllers/workoutcontroller');
app.use('/workout', workout);


app.listen(4000, function(){
    console.log('App is listening on port 4000');
})
