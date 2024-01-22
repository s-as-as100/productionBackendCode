import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

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
import userRouter from "./routes/user.routes.js";
import tweetRouter from "./routes/tweet.routes.js"
// routes declarations

app.use("/api/v1/users",userRouter)
app.use("/api/v1/users/tweet", tweetRouter)


// example : https://localhost:8000//api/v1/users/register
// https://localhost:8000/api/v1/users/login



export {app}
