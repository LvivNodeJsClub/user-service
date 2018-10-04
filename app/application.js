const express    = require('express')();
const bodyParser = require('body-parser');

const errorHandler       = require('app/util/errorHandler');
const ApplicationContext = require('app/applicationContext');
const UserRouter         = require('app/domain/user/userRouter');
const GroupRouter        = require('app/domain/group/groupRouter');

const applicationContext = new ApplicationContext();

const userRouter  = new UserRouter(applicationContext.userValidation, applicationContext.userController);
const groupRouter = new GroupRouter(applicationContext.groupValidation, applicationContext.groupController);

express.use(bodyParser.json());
express.use('/users', userRouter);
express.use('/groups', groupRouter);
express.use(errorHandler);

module.exports = express;
