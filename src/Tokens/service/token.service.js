import { createToken, getAllTokens } from "../repositories/token.repository.js";
import jwt from "jsonwebtoken";

export const createTokenService = async (req, res) => {
    try {
        const secretJWT = process.env.SECRET_JWT;
        if (!secretJWT) {
            return res.status(500).json({ error: "Secret JWT not found" });
        }

        const token = jwt.sign({}, secretJWT, {
            expiresIn: '1h'
        });

        const newToken = await createToken(token);
        return res.status(201).json(newToken);
    } catch (error) {
        console.error("Error in createTokenService:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const getAllTokensService = async (req, res) => {
    try {
        const tokens = await getAllTokens();
        return res.status(200).json(tokens);
    } catch (error) {
        console.error("Error al obtener tokens:", error);
        return res.status(500).json({ error: error.message });
    }
};