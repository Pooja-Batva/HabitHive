import 'dotenv/config';
import { app } from './app.js';
import connectDB from './db/index.js';


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000, ()=>{
        console.log(`App is listening at PORT : ${process.env.PORT}`);
    });  
})
.catch((err) => {
    console.log("DATABASE CONNECTION FAILED!!!", err);
});
