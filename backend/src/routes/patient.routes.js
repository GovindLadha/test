const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patient.controllers');
const Patient = require('../models/patient.model.js');
const fecthAllPatients = async(req,res) =>{
    console.log("Hello");
    let result  = await Patient.find();
    
    console.log(result);

    return res.json({
        result: result
    })
}

router.get('/fetchAllPatients', fecthAllPatients);
// Retrieve all patients
router.get('/', patientController.findAll);
// Create a new patient
router.post('/', patientController.create);
// Retrieve a single patient with id
router.get('/:id', patientController.findOne);
// Update a patient with id
router.put('/:id', patientController.update);
// Delete a patient with id
router.delete('/:id', patientController.delete);







module.exports = router
