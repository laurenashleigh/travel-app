
const app = require("./app");
// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function() {
  console.log("Example app listening on port 8080!");
});