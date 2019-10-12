const client = require('../data/data');
const newCar = require('../data/models/car');
const moment = require('moment');

//Postgress connection 
client.connect(err => {
    if(err) console.log("Postgress connection error: " + err.stack);
    console.log("Db connection status: Success!");
});

// Create table Car if it's not exist
client.query(newCar, (err) => {
    if(err) return console.log(err);
    console.log("Cats is created");
})


exports.getDriversPage = (req, res) => {
    client.query('SELECT * FROM car', (err, result) => {
        if(err) console.log('Something wrong with your database');
        res.render('index.ejs', {
            cars: result.rows,
            moment:moment 
        })
        console.log(result.rows);
    })
};

exports.postCarInfo = (req, res) => {


    const query = {
        text: 'INSERT INTO car(type, model, exp_date) VALUES($1,$2,$3)',
        values: [req.body.type, req.body.model, req.body.exp_year],
    };

    client.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.log(e.stack));

 
    res.redirect('/');

};
