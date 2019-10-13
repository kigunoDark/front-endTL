const onwersCont = require('../controllers/ownersCont');
const carsCont = require('../controllers/carsCont');
const express = require('express');
const router = express.Router();

// Cars 
router.get('/with-owner', carsCont.getCarsWithOwner);
router.get('/without-owner', carsCont.getCarsWithoutOwner);
router.post('/add-car', carsCont.postAddCar);
router.post('/delete-car', carsCont.deleteCar);

// Owners
router.get('/owners', onwersCont.getOwnersPage);
router.post('/add-owner', onwersCont.postOwnerInfo);

module.exports = router;