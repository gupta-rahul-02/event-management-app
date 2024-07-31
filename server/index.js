// const express = require('express');
import express from 'express';
// import sql from 'mssql'
// import sequelize from './models/config.js';
import User from './models/User.js';
import { syncronizeModels } from './db/sync.js';
// import Otp from './models/Otp.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// const user = require("./routes/userRoutes.js")

app.use("/api/v1",userRoutes)


// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//         //  User.sync({ alter: true });
//         //  Otp.sync({ alter: true });
//         return sequelize.sync({ alter: true });;
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })

syncronizeModels()

app.get("/",async (req,res) =>{
   try {
        const users = await User.findAll();
        res.send(users);
   } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
   }
})


app.listen(3000, () => {
    console.log('Listening on 3000')
})