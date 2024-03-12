const express = require('express');
const mongoose = require('mongoose');
const Employee = require("./models/Employee");
const app = express();
const port = 3000;

conn = mongoose.connect('mongodb://localhost:27017/company');

app.set('view engine', 'ejs');

const getRandom = (arr)=>{
    let rno = Math.floor(Math.random() * (arr.length - 1))
    return arr[rno]
}


app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
})

app.get('/generate', async (req, res) => {
    // Clear the collection Employee
    await Employee.deleteMany({}) 
    // Generate random data

    let randomNames = ["Mohsin", "Ahmed", "Aakifa", "Bushra"]
    let randomLang = ["Python", "Javascript", "C++", "Java"]
    let randomCities = ["Faisalabad", "Lahore", "Islamabad", "Kalaam"]
    for (let index = 0; index < 10; index++) {
        let e = await Employee.create({
            name: getRandom(randomNames),
            salary: Math.floor(Math.random() * 22000),
            language: getRandom(randomLang),
            city: getRandom(randomCities),
            isManager: (Math.random() > 0.5) ? true : false
        })
        console.log(e);
    }

    res.render('index', { foo: 'FOO' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})