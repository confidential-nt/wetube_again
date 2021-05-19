import express from "express";
import routes from "../routes.js";
import {
  getJoin,
  getLogin,
  postLogin,
  logout,
  postJoin,
} from "../controllers/userController.js";
import { home, search } from "../controllers/videoController.js";
import { onlyPublic } from "../middlewares.js";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
