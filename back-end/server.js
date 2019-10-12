const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRout = require('./routers/indexRout');
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRout);

app.listen(3000, (err) => {
    if(err) return err;
    console.log("Server is running")
});