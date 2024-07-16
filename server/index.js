// const express = require('express');
import express from 'express';
// import sql from 'mssql'
import sequelize from './models/config.js';
import User from './models/User.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// const user = require("./routes/userRoutes.js")

app.use("/api/v1",userRoutes)


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

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