const path = require('path');
const express = require('express');
const client = require('./data/data');
const bodyParser = require('body-parser');
const indexRout = require('./routers/indexRout');
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Postgress connection 
client.connect()
      .then(() => console.log("Db connection status: Success!")) 
      .catch(err => console.log("Postgress connection error: " + err.stack));

app.use(indexRout);

app.listen(3000, (err) => {
    if(err) return err;
    console.log("Server is running")
});