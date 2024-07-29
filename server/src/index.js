import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);

mongoose.connect(
    "mongodb+srv://flaviatrotolo:ABy8mzRtPAP9pzO3@recipies.ckaghac.mongodb.net/recipies?retryWrites=true&w=majority&appName=recipies"
);

app.listen(3001, () => console.log("SERVER STARTED"));


