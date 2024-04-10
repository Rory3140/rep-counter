const express = require("express");
const app = express();
const port = 3000;
const firebase = require("./firebase");

app.use(express.json());

app.post("/signup", (req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.post("/login", (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
