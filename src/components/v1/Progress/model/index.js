"use strict";

const {Schema, model} = require('mongoose');

const progressSchema = new Schema({

   body: {
       type: String,
       required: false,
       minLength: 1,
       maxLength: 255
   },

   image_path: {
       type: String,
       required: false,
       default: "", // will be implemented later
   },

   tags: {
       type: [ String ],
       required: false,
       default: [
           "#progress",
           "#consitency",
           "#self-celebration"
       ],
   },

   visibility: {
       type: String,
       required: true,
       default: "Private"
   },

   user: {
       type: Schema.Types.ObjectId,
       required: true
   }
});

const Progress = model('Progress', progressSchema);

module.exports = Progress;