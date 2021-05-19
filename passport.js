// npm으로 깔아준 passport local: username과 password 쓰는 사용자 인증 strategy를 의미
// Passport strategy for authenticating with a username and password.
// This module lets you authenticate using a username and password in your Node.js applications. By plugging into Passport, local authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.
// passport-github..등등도 있음.
import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); //passport local mongoose 덕에 이렇게 간단히 strategy를 설정할 수 있는 것. 원래는 존나 긺. 유저를 찾고 패스워드가 맞는지 확인하고 등등을 이 한줄로 다 할 수 있다. createStrategy() Creates a configured passport-local LocalStrategy instance that can be used in passport.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//serialization? "어떤 정보를 쿠키에게 주느냐를 의미."
// 즉, 어떤 field가 쿠키에 포함될 것인지를 알려줌.
//** 실습때는 쿠키에 민감한 정보를 절대로 담지마라! */
// 웹브라우저는 사용자에 대해 어떤 정보를 가질 수 있느냐..를 정의.
// 쿠키에는 id만 보일 것이다.
// ok, i think i’ve figure it out… passport.serializeUser() is setting id as cookie in user’s browser and passport.deserializeUser() is getting id from the cookie, which is then used in callback to get user info or something else, based on that id or some other piece of information from the cookie…
//deserialization? "어느 사용자인지 어떻게 찾는가?"
// 만약 쿠키를 받아봤는데 쿠키의 id가 1이라면?
// 그 쿠키의 정보를 어떻게 사용자로 전환하는가..
// mongoose local passport에는 이 모든 기능들이 간단하게 제공된다.
