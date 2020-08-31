const sequelize = require("../db");

module.exports =(sequelize, DataTypes) => {
    const Workout = sequelize.define('workout', {
        description:{
            type:DataTypes.STRING,
            allowNull: false
        },
        definition: {
            type:DataTypes.STRING,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER
        }

    })
    return Workout;
}

//description:string
//definition:string
//result: string
//owner_id: string