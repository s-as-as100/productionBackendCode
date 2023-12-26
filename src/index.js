// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
// import { DB_NAME } from "./constants";
import dbConnection from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

dbConnection()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("errror", (error) => {
//       console.log("ERRR: ", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("Connection Handled Error", error);
//     throw error;
//   }
// })();
