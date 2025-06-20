import express from "express";
import { Login, Logout, singup } from "../controller/UserAuthcontroller.js";

const routerUser = express.Router();

routerUser.post("/signup", singup);
routerUser.post("/login", Login);
routerUser.get("/logout", Logout);

export default routerUser;
