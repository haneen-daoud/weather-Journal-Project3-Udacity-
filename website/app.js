/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b3e18e0c11074329e563f9673ca228d0&units=imperial'; //my Personal API Key for OpenWeatherMap API



const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', formAction);

// Create a new date instance dynamically with JS
let datee = new Date();
let newDate = (datee.getMonth() + 1) + '.' + datee.getDate() + '.' + datee.getFullYear();

function formAction(e) {
    e.preventDefault();

    // Get user input
    const zipCode = document.getElementById('zip').value.trim();
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        generateBtn.classList.remove('invalid');
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function (data) {
                postData('/add', { temp: data.main.temp, date: newDate, content: content });
            }).then(function () {
                updateUI();
            }).catch(function (err) {
                console.log(err);
                alert('There was an error processing your request. Please try again.');
            });
    } else {
        generateBtn.classList.add('invalid');
    }
}
//to update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('Project Data:', allData); // Log the data for debugging
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML = ` ${allData.date}`;
            document.getElementById('temp').innerHTML = ` ${allData.temp}°F`;
            document.getElementById('content').innerHTML = ` ${allData.content}`;
        }
    } catch (err) {
        console.log('error', err);
    }
};
//to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();

        return newData;
    } catch (err) {
        console.log(err);
    }
};

//  to GET Web API Data
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}?zip=${zipCode},us&appid=${apiKey}`);
    try {
        const data = await res.json();
        console.log('Weather Data:', data); // Log the data for debugging
        return data;
    } catch (err) {
        console.log('error', err);
    }
};

