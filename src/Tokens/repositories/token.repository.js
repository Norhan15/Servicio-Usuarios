import Token from '../models/tokens.model.js';


export const createToken = async (token) => {
    try {
        const newToken = new Token({ token : token });
        await newToken.save();
        return newToken;
    } catch (error) {
        console.error("Error creating token:", error);
        throw error;
    }
} 

export const getAllTokens = async () => {
    try {
        return await Token.find(); // devuelve todos
    } catch (error) {
        console.error("Error al obtener tokens:", error);
        throw error;
    }
};