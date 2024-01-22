import { Router } from "express";
 import { createTweet } from "../controllers/tweet.controller.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router.route("/login").post(loginUser);


router.route("/").post(createTweet);
export default router;
