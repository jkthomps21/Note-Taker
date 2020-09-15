// Dependencies
const express = require("express");

// Set up express app
const app = express();

//Set up initial port
const PORT = process.env.PORT || 8080;

// Set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
    console.log("App listending on PORT: " + PORT);
});