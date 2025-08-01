import 'dotenv/config';
import express from 'express';
import connectDB from './db/index.js';

const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000, ()=>{
        console.log(`App is listening at PORT : ${process.env.PORT}`);
    });  
})
.catch((err) => {
    console.log("DATABASE CONNECTION FAILED!!!", err);
});
