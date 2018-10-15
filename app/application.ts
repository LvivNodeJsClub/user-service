import UserRouter from "./domain/user/userRouter";
import GroupRouter from "./domain/group/groupRouter";
import errorHandler from "./util/errorHandler";
import ApplicationContext from "./applicationContext";

const express = require('express')();
const bodyParser = require('body-parser');

const applicationContext = new ApplicationContext();

const userRouter = new UserRouter(applicationContext.userValidation, applicationContext.userController);
const groupRouter = new GroupRouter(applicationContext.groupValidation, applicationContext.groupController);

express.use(bodyParser.json());
express.use('/users', userRouter);
express.use('/groups', groupRouter);
express.use(errorHandler);

module.exports = express;
