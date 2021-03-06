const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// const notes = [];

router.get("/notes", (req, res) => {
  let notesData = fs.readFileSync("data/db.json", "utf8");
  notesData = JSON.parse(notesData);
  res.json(notesData);
});

router.post("/notes", (req, res) => {
  // read the json file
  let rawData = fs.readFileSync("data/db.json");
  // parse the data to get an array of objects
  notesData = JSON.parse(rawData);

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  // add new note to the array of note
  notesData.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "../../data/db.json"),
    JSON.stringify(notesData, null, 2)
  );

  res.json(notesData);
});

// // post route for posting notes to the server
// router.post("/notes", (req, res) => {

//   res.json(note);
// });

module.exports = router;
