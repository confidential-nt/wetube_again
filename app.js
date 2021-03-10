import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import routes from "./routes.js";
import { localsMiddleware } from "./middlewares.js";
const app = express();

app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //static: 해당 url 들어가면 directory에서 파일 보냄. 그러나 이런 식으로 서버에 직접 저장하면 많은 문제가 발생함..용량문제..번거로움 문제...기능적 문제...게다가 유저가 업로드 하는 영상은 static한 파일도 아님. static 파일은 주로 front-end에서 사용되는 logo image 같은 거..
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
