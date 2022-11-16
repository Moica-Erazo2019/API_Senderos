
const express = require('express');
const router = express.Router();

const UserController = require('/home/erazo20/BackSEDNeros/backsenderos/controllers/api/Users.js');

//to do;  si se cambia la contra el token antigua sigue siendo valido
router.get('/', UserController.getUser);

router.get('/profile/:_id', UserController.getProfile);

router.put('/', UserController.updateByID);

module.exports = router;