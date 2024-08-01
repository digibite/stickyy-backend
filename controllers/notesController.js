// controllers/notesController.js
const db = require("../config/db");

exports.createNote = (req, res) => {
  console.log(req.body);
  const { title, body, colors, position, user_id } = req.body;
  //const userId = req.userId;
  console.log(title, body, colors, position, user_id);

  const query =
    "INSERT INTO notes (title, body, colors, position, user_id) VALUES (?, ?, ?, ?, ?)";
  db.execute(
    query,
    [title || null, body, colors, position, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error creating note.");
      }
      res.status(201).send("Note created.");
    }
  );
};

exports.getNotes = (req, res) => {
  const userId = req.userId;

  const query = "SELECT * FROM notes WHERE user_id = ?";
  db.execute(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching notes.");
    }
    res.status(200).send(results);
  });
};

exports.updateNote = (req, res) => {
  const { id, title, body } = req.body;
  const userId = req.userId;

  const query =
    "UPDATE notes SET title = ?, body = ? WHERE id = ? AND user_id = ?";
  db.execute(query, [title, body, id, userId], (err, result) => {
    if (err) {
      return res.status(500).send("Error updating note.");
    }
    res.status(200).send("Note updated.");
  });
};

exports.deleteNote = (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  const query = "DELETE FROM notes WHERE id = ? AND user_id = ?";
  db.execute(query, [id, userId], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting note.");
    }
    res.status(200).send("Note deleted.");
  });
};
