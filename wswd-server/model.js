const mongoose = require("mongoose");

let Activity = new mongoose.Schema({
name:{
    type: String
},
activityType:{
    type: String,
    enum : [
        'Video Game',
         'TV Show',
         'Movie',
         'Outdoor Activity',
         'Local Activity',
         'Board / Card Game',
         'Learn Something',],
    default: 'Local Activity'



},
veto:{
    type:Boolean,
    default: false
}

}, { collection: 'activities' });

module.exports = mongoose.model("Activity",Activity);