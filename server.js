// Project Data
let projectData = {};

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('website'));

// Routes
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    const { temp, date, content } = req.body;
    projectData = {
        temp: temp,
        date: date,
        content: content
    };
    res.send(projectData);
});

// Set up the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
