const express = require("express");
const path = require("path");
const uuidv1 = require("uuidv1");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API rountes
// GET - read the db.json file and return all saved notes as JSON
app.get("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;

        let savedNotes = JSON.parse(data);
        res.json(savedNotes);

    });

})

// POST - receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;

        let savedNotes = JSON.parse(data);
        let newNoteData = req.body;

        // console.log(newNoteData);

        let makeId = uuidv1();

        newNoteData.id = makeId;

        // console.log(makeId);

        savedNotes.push(newNoteData);

        let updateNote = JSON.stringify(savedNotes);

        fs.writeFile("./db/db.json", updateNote, (err) => {
            if (err) throw err;

            console.log("Note added");
            res.json(savedNotes);
        })
    })
});

// DELETE - receive a query parameter containing ID of a note to delete.
app.delete("/api/notes/:id", function (req, res) {

    // Access :id from `req.params.id`
    const noteId = req.params.id;

    console.log(noteId);

    // Use the fs module to read the file
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err

        // THEN parse the file contects with JSON.parse() to get the real data.
        const savedNotes = JSON.parse(data);
        console.log(savedNotes);

        // Use the array.filter() method to filter out the matching element
        const newNoteArray = savedNotes.filter(note => note.id !== noteId) 
        
        console.log(newNoteArray);


        console.log("Note deleted");
    })

    // Return any time of success message.

})

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