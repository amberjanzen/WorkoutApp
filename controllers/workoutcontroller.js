let express = require ('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
//const workout = require('../models/workout');
const Workout = require('../db').import('../models/workout');


router.get('/workouttest', validateSession, function(req, res)
{
    res.send('test route for workout controller')
})



// POST: http://localhost:3000/workout/create - users create workout log with descriptions, definitions, results, and owner properties

router.post('/create', validateSession, (req,res) =>{
    const workoutEntry = {
        description: req.body.workout.description,
        definition: req.body.workout.definition,
        result: req.body.workout.result,
        ownerId: req.user.id
    }
    Workout.create(workoutEntry)
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({ error: err}))
});

// GET:  http://localhost:3000/workout/ gets all logs for an individual from an individual user.

router.get("/", (req, res) => {
    Workout.findAll()
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({error: err}))
});

// /workout/:id -get - gets individual logs by id for an individual user

router.get("/mine", validateSession, (req, res) => {
    let userId = req.user.id
    Workout.findAll({
        where: { ownerId: userId}
    })
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(500).json({error: err}))
});



// /workout/:id - put - allows individual logs to be updated by a user
router.put("/:id", validateSession, function(req, res) {
    const updateWorkoutLog = {
        description: req.body.workout.description,
        definition: req.body.workout.definition,
        result: req.body.workout.result,
    };

    const query = {where: {id: req.params.id, ownerId: req.user.id}};

    Workout.update(updateWorkoutLog, query)
    .then(workout => res.status(200).json(`${workout} workout log(s) changed`))
    .catch(err => res.status(500).json({error: err}))
});

// /workout/:id - delete - allows individual logs to be deleted by a user.
router.delete("/delete/:id", validateSession, function (req, res) {

    const query = {where: {id: req.params.id, ownerId: req.user.id}};

    Workout.destroy(query)
    .then(() => res.status(200).json({ message: "Workout Log Deleted"}))
    .catch((err) => res.status(500).json({error:err}));
})

module.exports = router