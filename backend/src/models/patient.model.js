const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    name: String,
    gender: Number,
    age: Number,
    insurance: Number,
    hypertension: Number,
    diabetes: Number,
    alcholism: Number,
    handicapped: Number,
    apt_date: Date,
    apt_time: String,
    probability: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', PatientSchema);