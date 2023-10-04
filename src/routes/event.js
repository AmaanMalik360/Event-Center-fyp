const express = require('express');
const {isRequestValidated } = require('../validators/auth')

const {requireSignin} = require('../common middleware/index');

const { validateAddEventRequest } = require('../validators/event');
const { addevent, addfood, addDecor, getResponses, getEvents } = require('../controller/event');
const { validateAddFoodRequest } = require('../validators/addfood');
const router = express.Router()


router.post('/add-event', validateAddEventRequest, isRequestValidated, addevent); 

router.patch('/event-food/:id', validateAddFoodRequest, isRequestValidated, addfood); 

router.patch('/event-decor/:id',
 //validateAddDecorRequest, isRequestValidated, 
 addDecor); 

router.get('/get-responses/:id', getResponses);

router.get('/events', getEvents);


module.exports = router