const Patient = require('../models/patient.model.js');
// Retrieve and return all patients from the database.
exports.findAll = (req, res) => {
    Patient.find()
        .then(patients => {
            res.send(patients);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of patients."
            });
        });
};
// Create and Save a new patient
exports.create = async (req, res) => {
    
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Create a new patient
    const patient = new Patient({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        insurance: req.body.insurance,
        hypertension: req.body.hypertension,
        diabetes: req.body.diabetes,
        alcholism: req.body.alcholism,
        handicapped: req.body.handicapped,
        apt_date: req.body.apt_date,
        apt_time: req.body.apt_time,
        probability: req.body.probability
    });
    // Save patient in the database
    // patient.save()
    //     .then(data => {
    //         res.send(data);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Something went wrong while creating new patient."
    //         });
    //     });
};
// Find a single patient with a id
exports.findOne = (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.id
                });
            }
            res.send(patient);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting patient with id " + req.params.id
            });
        });
};
// Update a patient identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Find patient and update it with the request body
    Patient.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.last_name,
        phone: req.body.last_name
    }, { new: true })
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.id
                });
            }
            res.send(patient);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating patient with id " + req.params.id
            });
        });
};
// Delete a patient with the specified id in the request
exports.delete = (req, res) => {
    
    Patient.findByIdAndRemove(req.params.id)
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.id
                });
            }

           
            res.send({ message: "patient deleted successfully!", status:true });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "patient not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete patient with id " + req.params.id
            });
        });
};