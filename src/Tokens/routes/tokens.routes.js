import { createTokenService, getAllTokensService } from "../service/token.service.js";
import { Router } from 'express';
const TokenRouter = Router();

TokenRouter.get("/token", createTokenService);
TokenRouter.get("/tokens", getAllTokensService);

export default TokenRouter;