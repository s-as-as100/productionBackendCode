// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
// import { DB_NAME } from "./constants";
import dbConnection from "./db/index.js";

dotenv.config({
    path: './.env'
})

dbConnection()
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
