const express = require("express");
const app = express();

require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

const cors = require("cors");

const users = [];

const extractUserInfo = (username) => {
  return users.find((user) => user.username === username);
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/validate-token", (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decodedInfo = jwt.verify(token, JWT_SECRET);
      const username = decodedInfo.username;
      const user = extractUserInfo(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(403).json({ error: "sign in again" });
      }
    } catch (error) {
      // * token is invalid, redirect to signup/signin
      res.status(403).json({
        error: "user is not authorized! Please Sign-up/Sign-in",
      });
    }
  }
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = extractUserInfo(username);

  if (user) {
    res.status(409).json({
      error: "user already exists",
    });
  } else {
    users.push({ username, password });
    res.status(200).json({ success: "user created" });
  }
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = extractUserInfo(username);

  if (!user) {
    //  send 404 user not found, tell user to sign up first
    res.status(404).json({ error: "user not found. you should sign up first" });
  } else if (user.username === username && user.password === password) {
    //  generate jwt token
    const token = jwt.sign({ username }, JWT_SECRET);
    res.setHeader("Authentication", token);
    // Expose the custom header so that the client can access it
    res.setHeader("Access-Control-Expose-Headers", "Authentication");
    res.status(200).json({ success: "user is verified" });
  } else if (user.username === username && user.password !== password) {
    //  send 403 unauthorized: incorrect password
    res.status(403).json({ error: "incorrect password" });
  }
});

app.listen(3000);
