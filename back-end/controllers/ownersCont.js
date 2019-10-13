const client = require('../data/data');
const newOwner = require('../data/models/owner');
const moment = require('moment');

// Create table Owner if it's not exist      
client.query(newOwner)
      .then(() => console.log("Owners table is creaded!"))
      .catch(e => console.log("You can't create an owner table: " + e.stack))
      .finally(()=> console.log('Table owner is already exist!'));

exports.getOwnersPage = async (req, res) => {

    try{
        const with_car = await client.query("SELECT * FROM cars, owners WHERE  owner_id = owners.id");
        console.log(with_car.rows)
        res.render('ownersPage.ejs', {
            with_car: with_car.rows,
            moment: moment
        });
    } catch(err) {
        console.log("Something wrong with youe query!!");
        console.log(err);
    }
}

exports.postOwnerInfo = (req, res) => { 
   const query = {
        text: 'INSERT INTO owners (name, phone, email) VALUES($1,$2,$3)',
        values: [req.body.name, req.body.phone, req.body.email],
    };
    client.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.log(e.stack));
    res.redirect('/owners');
}