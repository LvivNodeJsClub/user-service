const express    = require('express')();
const bodyParser = require('body-parser');

const ApplicationContext = require('applicationContext');
const ErrorHandler       = require('error/errorHandler');
const UserRouter         = require('domain/user/userRouter');

const applicationContext = new ApplicationContext();

const userRouter   = new UserRouter(applicationContext.userValidation, applicationContext.userController);
const errorHandler = new ErrorHandler();

express.use(bodyParser.json());
express.use('/users', userRouter);
express.use(errorHandler.handle);


module.exports = express;
