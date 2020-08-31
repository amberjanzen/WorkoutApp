const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-app', 'postgres', 'Grapesn2020.',
{
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to journal-walkthrough postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize