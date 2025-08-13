import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();




// for configuration and middlewares

// request kya kya origin thi except karvani che
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

// user no data configure karva mate
app.use(express.json());

// url no data excess karva mate
app.use(express.urlencoded({ extended: true }));

// temp storage
app.use(express.static("public"));

// secure cookie save karva mate
app.use(cookieParser());


// // for debug
// app.use((req, res, next) => {
//   console.log('BODY:', req.body);
//   next();
// });


// Routes import
import { userRouter } from "./routes/index.js";


// Routes declaration
app.use("/api/v1/users", userRouter);




export { app }