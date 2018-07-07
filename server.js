// Dependecies
const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const path = require("path");

//Launch app
const PORT = process.env.PORT || 3000;
mongoose.Promise = bluebird;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets if in production (running on Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
} else {
  app.use(express.static(__dirname + "/public"));
}

// enable CORS, use:
// https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});

//Routes? I think? Strong use of Google-Fu here
var controller = require('./controllers/controller');
var router = new express.Router();
//defining API routes
router.get("/api/saved", controller.find);
//Save Articles
router.post("/api/saved", controller.insert);
//delete saved articles
router.delete("/api/saved/:id", controller.delete);
//send every other request to the request react app
router.get("/*", function(req,res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use(router);

//connect mongoose to our database
const db = process.env.MONGODB_URI || "mongodb://localhost/nyt-react";
mongoose.connect(db, function(error) {
	if (error) {
		console.error(error);
	}
	else {
		console.log("mongoose connection is successful");
	}
});

//start the server
app.listen(PORT, function {
	console.log('Server is now running');
});