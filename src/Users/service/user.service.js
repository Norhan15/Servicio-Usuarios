import { createUser } from "../Repositories/user.repository.js";
import { getAllUsers } from "../Repositories/user.repository.js";
import { getAllTokens } from "../../Tokens/repositories/token.repository.js";

export const createUserService = async (req, res) => {
    try {
        const { name, email, password, token } = req.body;

        if (!name || !email || !password || !token) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        // Verificar si el token existe en la base de datos
        const tokens = await getAllTokens();
        const tokenExists = tokens.some(t => t.token === token);

        if (!tokenExists) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const newUser = await createUser({ name, email, password, token });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error en createUserService:", error);
        return res.status(500).json({ error: error.message });
    }
};



export const getUsersService = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error en getUsersService:", error);
        return res.status(500).json({ error: error.message });
    }
};
