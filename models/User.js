import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
//passport를 사용하여 사용자 인증과 관련된 부분(패스워드 설정, 확인 등등)에 대한
// 작업을 할 수 있게 하는 mongoose 플러그인. Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
// 그러한 기능들을 만드는 데에 굳이 시간을 쓰지 않아도 됨.
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String, // 서버에 사진을 업로드하게 할 수도 있고 깃헙같은데에서 끌어올 수도 있음.
  twitterId: Number,
  githubId: Number, // 이렇게 소셜 로그인 계정을 저장해두면 다양한 로그인을 제안할 수 있다.
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" }); //로그인 실패관련 설정도 있던데 그거 나중에 혼자 해보는걸로.

const model = mongoose.model("User", UserSchema);

export default model;
