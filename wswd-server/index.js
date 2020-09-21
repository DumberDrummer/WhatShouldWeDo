require('dotenv').config()
const express = require("express");
const router = express.Router()

const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const mongoose = require("mongoose");
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`, {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("Connection with Mongo was successful");
});

let Activity = require("./model");

app.use("/", router);


app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port: " + process.env.APP_PORT);
});

app.get('/api/activities/:id', (req, res) => {

    const activity = Activity.findById(req.params.id)
    if (activity) {
        res.json(activity)
    }
    else {
        res.status(404).end()
    }

});

app.put('/api/activities/:id', (req, res) => {
    Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(update => {
            console.log(update)
            res.json(update.toJSON()
            )
        })
});

app.post('/api/activities', (req, res) => {
    const activity = req.body

    const newThing = new Activity({ activityType: activity.activityType, name: activity.name })

    newThing.save()
        .then(savedThing => savedThing.toJSON())
        .then(savedThing => {
            res.json(savedThing).end()
            console.log(savedThing)
        })
        .catch(error => next(error))
});

app.delete('/api/activities/:id', (request, response, next) => {
    Activity.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
});
app.get("/api/activities", (req, res) => {
    Activity.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }

    });
});