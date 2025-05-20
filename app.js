import express from 'express';
import cors from 'cors';
import config from './src/config/config.js';
import TokenRouter from './src/Tokens/routes/tokens.routes.js';
import UserRouter from './src/Users/routes/users.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/", TokenRouter);
app.use("/", UserRouter);


app.use((req, res) => {
    res.status(404).send("Wrong route dev");
});

config.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error al iniciar el servidor:", error);
});
