const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const session = require("express-session");
const path = require("path");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
  })
);

cloudinary.config({
  cloud_name: "dnmtsuwhc",
  api_key: "986122193756244",
  api_secret: "GkKJj3GrIR9nd0q6Li0q-6pKK38",
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Wweisbest1234@",
  database: "jnec_project",
  insecureAuth: true,
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM events  ORDER BY event_id DESC LIMIT 4";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getall", (req, res) => {
  const sqlGet = "SELECT * FROM events  ORDER BY event_id DESC";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.post("/api/feedback", (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "05210218.jnec@rub.edu.bt",
      pass: "wweisbest1234@",
    },
  });

  const mailOptions = {
    from: "05210218.jnec@rub.edu.bt",
    to: "dhakalbishal930@gmail.com",
    subject: "Feedback Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone No: ${phone}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Feedback submitted");
    }
  });
});

const upload = multer({ dest: "temp/" });

app.post("/api/post", upload.single("event_image"), async (req, res) => {
  const { event_name, event_description, event_date, event_link } = req.body;

  const result = await cloudinary.uploader.upload(req.file.path);
  const imageURL = result.secure_url;
  console.log(imageURL);
  const sqlInsert =
    "INSERT INTO events (event_name, event_description, event_image, event_date, event_link, ) VALUES (?, ?, ?, ?, ?);";
  db.query(
    sqlInsert,
    [event_name, event_description, imageURL, event_date, event_link],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("event added");
      }
    }
  );
});

app.post("/api/adminlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = "SELECT * FROM superuser WHERE username= ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.length === 1) {
      req.session.username = username;
      res.send("login sucess");
    } else {
      res.send("invalid username or password");
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
