const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "app.module.js"),
  devServer: {
    port: 3000,
    watchFiles: ["src/**/*"],
    setupMiddlewares(middlewars, { app }) {
      app.use(bodyParser.json());
      app.get("/data/users.json", function (req, res) {
        let { userId } = req.query;
        let data = JSON.parse(fs.readFileSync(path.join("data", "users.json")));
        if (userId) {
          let item = data.find((item) => item.id === userId);
          if (item) {
            res.json(item);
            return;
          } else {
            res.status(404);
            res.send({ message: "Item not found" });
            return;
          }
        }
        res.json(data);
      });
      app.post("/data/users/create", function (req, res) {
        let { user } = req.body;
        user.id = user.userName;
        let data = JSON.parse(fs.readFileSync(path.join("data", "users.json")));
        data[data.length] = user;

        fs.writeFileSync(path.join("data", "users.json"), JSON.stringify(data));
        res.json(user);
      });
      app.post("/data/users/isExist", function (req, res) {
        let { userName } = req.body;
        let item = JSON.parse(
          fs.readFileSync(path.join("data", "users.json"))
        ).find((item) => item.userName === userName);
        res.status(200);
        res.send({ isExist: !!item, item: item ? item : null });
      });
      app.put("/data/users/:userId", function (req, res) {
        let { userId } = req.params;
        let { updatedUser } = req.body;
        let data = JSON.parse(fs.readFileSync(path.join("data", "users.json")));
        let itemIndex = data.findIndex((item) => item.id === userId);
        data[itemIndex] = updatedUser;

        fs.writeFileSync(path.join("data", "users.json"), JSON.stringify(data));

        res.json(updatedUser);
      });
      app.delete("/data/users/:userId", function (req, res) {
        let { userId } = req.params;

        let data = JSON.parse(
          fs.readFileSync(path.join("data", "users.json"))
        ).filter((item) => item.id !== userId);
        fs.writeFileSync(path.join("data", "users.json"), JSON.stringify(data));
        res.send("User was deleted");
        return;
      });
      app.post("/users.json", function (req, res) {
        res.send("POST res sent from webpack dev server");
      });
      return middlewars;
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: path.join(_dirname, "app"),
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "data",
          to: "data",
        },
      ],
    }),
  ],
};
