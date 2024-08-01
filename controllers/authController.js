// controllers/authController.js
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.signUp = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  //const hashedPassword = bcrypt.hashSync(password, 8);
  const hashedPassword = password;

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.execute(query, [username, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send("Error registering user.");
    }
    res.status(201).send("User registered.");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.execute(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send("Error logging in.");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    const user = results[0];
    //const passwordIsValid = bcrypt.compareSync(password, user.password);
    const passwordIsValid = password;

    if (!passwordIsValid) {
      return res.status(401).send("Invalid password.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ auth: true, token });
  });
};
