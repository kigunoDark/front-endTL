const client = require('../data/data');
const newCar = require('../data/models/car');
const newOwner = require('../data/models/owner');
const moment = require('moment');

//Postgress connection 
client.connect()
      .then(() => console.log("Db connection status: Success!")) 
      .catch(err => console.log("Postgress connection error: " + err.stack));

// Create table Car if it's not exist
client.query(newCar)
      .then(() => console.log("Cars table is creaded!"))
      .catch(e => console.log("You can't create a car table: " + e.stack))
      .finally(()=> console.log('Table car is already exist!'));

// Create table Owner if it's not exist      
client.query(newOwner)
      .then(() => console.log("Owners table is creaded!"))
      .catch(e => console.log("You can't create an owner table: " + e.stack))
      .finally(()=> console.log('Table owner is already exist!'));

exports.getDriversPage = async (req, res) => {

    try {
        const cars = await client.query("SELECT * FROM cars, owners WHERE (owner_id = owners.id) OR (owner_id IS NULL)");
        const owners = await client.query("SELECT * FROM owners");
        console.log(cars.rows);
        res.render('index.ejs', {
            cars: cars.rows,
            owners: owners.rows,
            moment:moment 
        })
    } catch(err){
        console.log('Something wrong with your database');
    };

};

exports.postCarInfo = (req, res) => {
    const car = {
        owner_id: req.body.owner_id,
        type: req.body.type,
        model: req.body.model,
        exp_year: req.body.exp_year
    }

    if(car.owner_id === '') car.owner_id = null; 

    const query = {
        text: 'INSERT INTO cars (owner_id, type, model, exp_year) VALUES($1,$2,$3,$4)',
        values: [car.owner_id, car.type, car.model, car.exp_year],
    };

    client.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.log(e.stack));
    res.redirect('/');
};

exports.postOwnerInfo = (req,res) => { 
   const query = {
        text: 'INSERT INTO owners (name, phone, email) VALUES($1,$2,$3)',
        values: [req.body.name, req.body.phone, req.body.email],
    };

    client.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.log(e.stack));
    res.redirect('/');
}