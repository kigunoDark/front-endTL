const indexCont = require('../controllers/indexCont');
const express = require('express');
const router = express.Router();

router.get('/', indexCont.getDriversPage);
router.post('/add-car', indexCont.postCarInfo);

module.exports = router;