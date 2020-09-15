// Dependencies
const path = require("path");

// Routing
module.exports = function(app) {

    // Returns main page
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Returns splash page
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};
