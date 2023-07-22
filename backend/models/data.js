const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    depertment:{
        type: String,
        required: true, 
    },
    sem:{
        type: String,
        required: true, 
    }, 
    date:{
        type: Date,
        // required: true, 
        default: Date.now,
    },
    student_no:{
        type: Number,
        required: true,
    }
  });
   module.exports = mongoose.model('attendence_data', DataSchema);
