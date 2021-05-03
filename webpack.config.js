// webpack command는 자동적으로 이 파일을 찾는다.
// server 코드와는 연관시키지 말것!! 100% client 관련 코드
// 따라서 babel node를 쓸 수 없음 => 옛날 자바스크립트 쓰기..
// 실행 방향은 무조건 뒤에서 앞으로!
// sass loader는 scss를 css로 바꿈
// post css는 익스플로러와 위한 호환성 작업같이..호환성 관련 작업해줌. 그외 다양한 작업 해줌. plugin을 주면 그걸로 작업 해줌.

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
const MODE = process.env.WEBPACK_ENV;

const config = {
  mode: MODE,
  entry: ["@babel/polyfill", ENTRY_FILE],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: OUTPUT_DIR,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  devtool: "source-map",
};

// const config = {
//   entry: ENTRY_FILE,
//   mode: MODE,
//   module: {
//     rules: [
//       {
//         test: /\.(scss)$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//           },
//           {
//             loader: "css-loader",
//           },
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: [
//                   [
//                     "autoprefixer",
//                     {
//                       browsers: "cover 99.5%",
//                     },
//                   ],
//                 ],
//               },
//             },
//           },
//           {
//             loader: "sass-loader",
//           },
//         ],
//       },
//     ],
//   },
//   output: {
//     path: OUTPUT_DIR,
//     filename: "[name].js",
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       // Options similar to the same options in webpackOptions.output
//       // both options are optional
//       filename: "[name].css",
//     }),
//   ],
// };

module.exports = config;
