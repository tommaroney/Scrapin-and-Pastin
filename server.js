const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

const routes = require("./routes/apiController");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.static("./public"));
app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.engine(
    "handlebars", 
    exphbs({
        defaultLayout: "main"
    })
);
    
app.set("view engine", "handlebars");

app.use(routes);
    
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT);
});