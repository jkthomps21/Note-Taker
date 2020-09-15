const path = require("path");
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const getNotes = () => readFileAsync(path.join(__dirname, "../db/db.json"), "utf-8");

module.exports = function(app) {
    
    // Reads db.json file and returns saved notes
    app.get("/api/notes", async (req, res) => {
        console.log("Attempting to read file...");
        try {
            let data = await getNotes();
            return res.json(JSON.parse(data));
        } catch (err) {
            console.log(err);
        }
    });

    // Receives new notes
    app.post("/api/notes", async (req, res) => {
        let entry = JSON.stringify(req.body);
        try {
            let data = await getNotes();
            let array = JSON.parse(data);
            let newNote = JSON.parse(entry);
            newNote.id = uuidv4();
            array.push(newNote);
            await writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(array));
            console.log("Notes database has been updated!");
            return res.json(entry);
        } catch (err) {
            console.log(err);
        }
    });

    // Deletes notes by id
    app.delete("/api/notes/:id", (req, res) => {
        let noteID = req.params.id;
        let data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8");
        let array = JSON.parse(data);
        for (arr of array) {
            if (arr.id == noteID) {
                array.pop(arr);
                fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(array));
            }
        }
        res.json({message: "File Deleted"});
    });
};