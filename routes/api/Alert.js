const express = require('express');
const router = express.Router();

const AlertController = require('../../controllers/api/Alert');


//var upload = multer({ dest: 'uploads/'})

//RUTAS 

router.post('/', AlertController.create);

router.get('/id/:_id', AlertController.findOneByID);

router.get('/all', AlertController.findAll);

router.get('/user', AlertController.findByUser);

router.delete('/delete/:_id', AlertController.deleteOneByID);

module.exports = router;