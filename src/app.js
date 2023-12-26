import express from "express";
import cors from "cors";
import cookieParser from "cookies-parser";

const app = express();

// use keyword used for middleware;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routers.js";

// routes declarations

app.use("/api/v1/users",userRouter)


// example : https://localhost:8000//api/v1/users/register
// https://localhost:8000/api/v1/users/login



export {app}
