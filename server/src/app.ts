import express, { Express } from "express";
import CountryRoutes from "./routes/CountryRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(CountryRoutes);

export default app;