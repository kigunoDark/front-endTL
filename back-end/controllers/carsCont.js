const client = require('../data/data');
const newCar = require('../data/models/car');
const moment = require('moment');

// Create table Car if it's not exist
client.query(newCar)
      .then(() => console.log("Cars table is creaded!"))
      .catch(e => console.log("You can't create a car table: " + e.stack))
      .finally(()=> console.log('Table car is already exist!'));

exports.getCarsWithoutOwner = async (req, res) => {
    const type = "without";
    try {
        const cars = await client.query("SELECT * FROM cars WHERE (owner_id IS NULL)");
        const owners = await client.query("SELECT * FROM owners");

        res.render('carsPage.ejs', {
            cars: cars.rows,
            owners: owners.rows,
            moment:moment,
            type: type
        })
    } catch(err){ 
        console.log('Something wrong with your database');
        console.log(err);
    };

};

exports.getCarsWithOwner = async (req, res) => {
    const type = 'with'
    try {
        const cars = await client.query("SELECT * FROM owners, cars  WHERE (owner_id = owners.id)");
        const owners = await client.query("SELECT * FROM owners");

        res.render('carsPage.ejs', {
            cars: cars.rows,
            owners: owners.rows,
            moment:moment,
            type: type
        })
    } catch(err) {
        console.log('Something wrong with your database');
        console.log(err);
    };

};

exports.deleteCar = async (req, res) => {
    const car_id = req.body.car_id;
    try {
        console.log('Success');
        await client.query(`DELETE FROM cars WHERE cars.id = ${car_id}`);
        res.redirect('/with-owner')
    } catch(err) {
        console.log("Somethin wrong with your query!");
        console.log(err);
    };
};

exports.postAddCar = async (req, res) => {
    const car = {
        owner_id: req.body.owner_id,
        type: req.body.type,
        model: req.body.model,
        exp_year: req.body.exp_year
    };

    if(car.owner_id === '') car.owner_id = null; 

    const query = {
        text: 'INSERT INTO cars (owner_id, type, model, exp_year) VALUES($1,$2,$3,$4)',
        values: [car.owner_id, car.type, car.model, car.exp_year],
    };

    await client.query(query)
                .then(res => console.log(res.rows[0]))
                .catch(e => console.log(e.stack));
    res.redirect('/with-owner');
};

exports.updateCarOwner =  async (req, res) => {
    const owner_id = req.body.owner_id;
    const car_id = req.params.car_id;
    const query = await client.query(`UPDATE cars SET owner_id = ${owner_id} WHERE cars.id = ${car_id}  RETURNING owner_id `);

    await client.query(query)
                .then(result => console.log('You changed' + result))
                .catch(err => console.log(err));

    res.redirect('/without-owner');
};

exports.getUpdateCar = async (req, res) => {

    try {
        const type = "updateCar";
        const car_id = Number(req.params.car_id); 
        const car = await client.query(`SELECT * FROM cars WHERE cars.id = ${car_id}`);
        const owners = await client.query("SELECT * FROM owners");

        res.render('carsPage.ejs', {
            type: type,
            car: car.rows[0],
            owners: owners.rows,
            moment:moment
        });

    } catch(err) {
        console.log(err);
    };

};

exports.postUpdateCar = async(req, res) => {

    const car_id = req.params.car_id;
  
    const query = await client.query(`UPDATE cars SET
                                            type = '${req.body.type}',
                                            model = '${req.body.model}',
                                            owner_id = ${req.body.owner_id},
                                            exp_year = '${req.body.exp_year}'
                                            WHERE cars.id = ${car_id}  
                                         `);

    await client.query(query)
                .then(newCar => console.log(newCar.rows))
                .catch(err => console.log(err));
                
    res.redirect("/with-owner");
}