import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Opption1: Allow all origins with default of cors(*)
app.use(cors());
// Opption2: Allow custom origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','DELETE','PUT'],
//         allowedHeaders:['Content-Type'],
//     })
// );


app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send("hey hey welcome y'all");
})

app.use('/books',booksRoute);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT , () => {
        console.log(`App is listemning to port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})