const client = require('./data/data');
const express = require('express');
const bodyParser = require('body-parser');
const indexRout = require('./routers/indexRout');


const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(indexRout);


app.listen(3000, (err) => {
    if(err) return err;
    console.log("Server is running")
});