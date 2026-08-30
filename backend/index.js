// const express = require("express")
import express from "express"
const app = express();
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()

Connection()
const port = process.env.PORT

app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],      // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
    credentials: true,                              // Allow cookies/auth headers
    optionsSuccessStatus: 200                       // Legacy browser compatibility (IE11)
};

app.use(cors(corsOptions));

app.use(express.json())
app.use("/api/v1/product", productRouter)
app.use("/api/v1/user", userRouter)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})


// npm i -g nodemon

// middleware => 

// http://localhost:8000/api/v1/product/create-product
// http://localhost:8000/api/v1/user/register-user
// Model view controller