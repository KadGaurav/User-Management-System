const express = require('express');
const { model } = require('mongoose');
const controller = require('../controller/controller')

const route = express.Router();

const services = require('../services/render');

route.get("/",services.homeRoutes);

route.get("/add-user",services.add_user);

route.get("/update-user",services.update_user);

//API Route
route.post('/api/users' , controller.create);
route.get('/api/users' , controller.find);
route.put('/api/users/:id' , controller.update);
route.delete('/api/users/:id' , controller.delete);





module.exports = route;