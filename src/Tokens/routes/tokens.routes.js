import { createTokenService } from "../service/token.service.js";
import { Router } from 'express';
const TokenRouter = Router();

TokenRouter.get("/token", createTokenService);

export default TokenRouter;