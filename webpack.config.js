const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "app.js"
  },
  watch: true
}