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
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

import "./passport";

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
app.use("/uploads", express.static("uploads")); //static: uploads라는 route 만들지 않았음. 따라서 해당 url 들어가면 directory에서 파일 보냄. 그러나 이런 식으로 서버에 직접 저장하면 많은 문제가 발생함..용량문제..번거로움 문제...기능적 문제...게다가 유저가 업로드 하는 영상은 static한 파일도 아님. static 파일은 주로 front-end에서 사용되는 logo image 같은 거..
// app.use("/uploads", express.static("uploads")); 에 대한 정리
// -> /uploads 접근 시
// (ex : video URL - http://localhost:4000/uploads/videos/{:id})

// 기존 : pug로 구성한 uploads/videos/{:id} 페이지 이동 -> 만들지 않았으니 에러

// static 미들웨어 사용 : 서버 상의 /uploads 디렉토리로 이동 -> videos 디렉토리 내에 id값에 해당하는 비디오 get
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }), // 쿠키저장소를 db와 연결
  })
); // secet 옵션: 쿠키에 들어있는 session id를 암호화. 어떤 문자열을 넣어도 작동. randomkeygen에 들어가면 무작위 문자열을 얻을수있다.
app.use(passport.initialize()); //  passport.initialize() initialises the authentication module. In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used. With sessions, initialize() setups the functions to serialize/deserialize the user data from the request.
// You are not required to use passport.initialize() if you are not using sessions.
app.use(passport.session()); //세션을 저장시켜줌.
// 실행 순서: passport 초기화 => passport가 제 스스로 쿠키를 들여다봐서 그 쿠키 정보에 해당하는 사용자 찾음 => 그 사용자를 req.user로 만들어줌. => 이  req.user는 우리가 무슨 요청을 할때마다 생기는 것.

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
