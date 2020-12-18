const express = require("express");
const path = require("path");

const fs = require("fs");
const { dirname } = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", function (req, res) {

    // Use the fs module to read the file

    // THEN parse the file contects with JSON.parse() to get the real data.

    // Send the parsed data back to client with res.send()

})

app.post("/api/notes", function (req, res) {

    // Access the POSTed data in `req.body`

    // Use the fs module to read the file

    // THEN parse the file contects with JSON.parse() to get the real data.

    // PUSH the `req.body` to the array list.

    //JSON.stringify() the array list back into a JSON string

    // THEN save the contects back to the `db.json` with the "fs" module

})

app.delete("/api/notes/:id", function(req, res) {
        
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

})

app.get("/notes", function (req, res) {

    // return the contents of the index.html
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("*", function (req, res) {

    // return the contents of the index.html
    res.sendFile(path.join(__dirname, "public/index.html"));
})



app.listen(PORT, function () {
    console.log("App listening to PORT " + PORT)
});