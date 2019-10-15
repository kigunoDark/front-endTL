const onwersCont = require('../controllers/ownersCont');
const carsCont = require('../controllers/carsCont');
const express = require('express');
const router = express.Router();

// Cars 
router.get('/with-owner', carsCont.getCarsWithOwner);
router.get('/without-owner', carsCont.getCarsWithoutOwner);
router.get('/edit-car/:car_id', carsCont.getUpdateCar);
router.post('/add-car', carsCont.postAddCar);
router.post('/delete-car', carsCont.deleteCar);
router.post('/change-owner/:car_id', carsCont.updateCarOwner);
router.post('/update-car/:car_id', carsCont.postUpdateCar)

// Owners
router.get('/owners', onwersCont.getOwnersPage);
router.post('/add-owner', onwersCont.postOwnerInfo);

module.exports = router;