import { Router } from 'express';
import { createUserService } from '../service/user.service.js';
import { getUsersService } from '../service/user.service.js';

const UserRouter = Router();

UserRouter.post("/users", createUserService);
UserRouter.get("/users", getUsersService);

export default UserRouter;
