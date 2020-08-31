require('dotenv').config();
let express = require ('express');
//const { response } = require('express');
let app = express();
let sequelize= require('./db')

let workout =
require('./controllers/workoutcontroller');
let user= require('./controllers/usercontroller');

sequelize.sync();
//sequelize.sync({force: true})
app.use(express.json());

app.use('/user', user);

app.use(require("./middleware/validate-session"));
app.use('/workout', workout);


app.listen(3000, function(){
    console.log('App is listening on port 3000');
})
