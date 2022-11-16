const express = require('express');
const router = express.Router();

const AlertTypeController = require('../../controllers/api/AlertType');

router.post('/', AlertTypeController.create);

router.get('/all', AlertTypeController.findAll);

router.delete('/delete/:_id', AlertTypeController.deleteOneByID);

module.exports = router;