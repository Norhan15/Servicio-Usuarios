import User from '../models/user.model.js';

export const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        return await User.find(); // trae todos los usuarios
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        throw error;
    }
};
