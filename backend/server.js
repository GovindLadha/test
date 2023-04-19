const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const uri = "mongodb+srv://govind:govind@cluster0.bn74otj.mongodb.net/?retryWrites=true&w=majority";
const patientRoutes = require('./src/routes/patient.routes')

mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use('/api/patient', patientRoutes)

app.get('/', (req, res) => {
    res.json({ "message": "Hello World" });
});

app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});
