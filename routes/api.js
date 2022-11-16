const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middlewares/Auth');

const AuthRouter = require('./api/Auth');
const UserRouter = require('./api/User');
const AlertRouter = require('./api/Alert');
const AlertTypeRouter = require('./api/AlertType');
const RolRouter = require('./api/Rol');

router.use('/auth', AuthRouter);

//router.use(AuthMiddleware.verifyAuth);

router.use('/alert', AuthMiddleware.verifyAuth, AlertRouter);

router.use('/user', AuthMiddleware.verifyAuth, UserRouter);

router.use('/alertType', AuthMiddleware.verifyAuth, AlertTypeRouter);

router.use('/rol', AuthMiddleware.verifyAuth, RolRouter);

module.exports = router;