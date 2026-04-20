import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: ['http://127.0.0.1:5173','http://localhost:5173'],
    credentials : true
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/user.route.js"
app.use('/api/user',userRoutes)

export default app;