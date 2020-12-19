const express = require("express");
const path = require("path");

const fs = require("fs");
const dbNotePath = require("./db/db.json");
const { json } = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// API rountes
// GET - read the db.json file and return all saved notes as JSON
app.get("/api/notes", function (req, res) {

    // Use the fs module to read the file
    fs.readFile(dbNotePath, (err, data) => {
        if (err) {
            console.error(err);
        }
        const readData = JSON.parse(data)
        console.log(readData);
        return res.json(readData);
    })
})

// POST - receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {

    // Access the POSTed data in `req.body`
    const newNoteData = req.body;

    // Use the fs module to write the file
    fs.writeFile(path.join(__dirname, dbNote), newNoteData)

    // THEN parse the file contects with JSON.parse() to get the real data.

    // PUSH the `req.body` to the array list.
    dbNote.push(newNoteData);

    //JSON.stringify() the array list back into a JSON string

    // THEN save the contects back to the `db.json` with the "fs" module

    console.log(dbNote);
})


// DELETE - receive a query parameter containing ID of a note to delete.
// app.delete("/api/notes/:id", function(req, res) {

// Access :id from `req.params.id`

// Use the fs module to read the file

// THEN parse the file contects with JSON.parse() to get the real data.

// OPTION A
// Find the matching index using findIndex()

// Remove thetarget element using .splice()

// OPTION B
// Use the array.filter() method to filter out the matching element
// myArray = myArray.filter( element => element.id !== req.params.id);

// Return any time of success message.

// })

app.get("/notes", function (req, res) {

    // return the contents of the notes.html
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("*", function (req, res) {

    // return the contents of the index.html
    res.sendFile(path.join(__dirname, "public/index.html"));
})



app.listen(PORT, function () {
    console.log("App listening to PORT " + PORT)
});