const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");

const session = require("express-session");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB
  },
});

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

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "wweisbest1234@",
  database: "jnec_project",
  insecureAuth: true,
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM events ORDER BY event_id DESC";
  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving events from database");
    } else {
      const eventsWithImages = result.map(async (event) => {
        const imageBuffer = event.event_image;
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();
        if (metadata.format === undefined) {
          console.log("Invalid image format");
        } else {
          const imageData = Buffer.from(imageBuffer).toString("base64");
          event.event_image = `data:image/${metadata.format};base64,${imageData}`;
        }
        return event;
      });

      Promise.all(eventsWithImages)
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error processing images");
        });
    }
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

const MAX_IMAGE_SIZE = 10000000; // 10 MB in bytes

app.post("/api/post", upload.single("event_image"), async (req, res) => {
  const { event_name, event_description, event_date, event_link } = req.body;

  let image = req.file ? req.file.buffer : null;
  const imageSize = image ? image.length : 0;

  if (imageSize > MAX_IMAGE_SIZE) {
    console.log("Image size exceeds the limit of 10 MB");
    res.status(400).send("Image size exceeds the limit of 10 MB");
    return;
  }

  // Use a default image if no image was uploaded
  if (!image) {
    const sqlGet = "SELECT * FROM default_image";
    db.query(sqlGet, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving events from database");
      } else if (result.length > 0) {
        const defaultImage = result[0].default_image;
        image = Buffer.from(defaultImage, "base64");
        const metadata = sharp(defaultImage).metadata();
        if (metadata.format === undefined) {
          console.log("Invalid image format");
        } else {
          const imageData = Buffer.from(defaultImage).toString("base64");
          image = `data:image/${metadata.format};base64,${imageData}`;
        }
        const sqlInsert =
          "INSERT INTO events (event_name, event_description, event_image, event_date, event_link ) VALUES (?, ?, ?, ?, ?);";
        db.query(
          sqlInsert,
          [event_name, event_description, image, event_date, event_link],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error adding event to database");
            } else {
              res.send("event added");
            }
          }
        );
      } else {
        console.log("No default image found");
        res.status(400).send("No default image found");
      }
    });
  } else {
    const sqlInsert =
      "INSERT INTO events (event_name, event_description, event_image, event_date, event_link ) VALUES (?, ?, ?, ?, ?);";
    db.query(
      sqlInsert,
      [event_name, event_description, image, event_date, event_link],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error adding event to database");
        } else {
          res.send("event added");
        }
      }
    );
  }
});

app.post("/api/adminlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql =
    "SELECT * FROM superuser WHERE username= ? AND password = SHA2(?, 256)";
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

app.get("/api/adminlogout", (req, res) => {
  req.session.destroy();
  res.send("logout sucess");
});

const MAX_FILE_SIZE = 10000000; // 10 MB in bytes

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    if (req.file.size > MAX_FILE_SIZE) {
      res.send("File size exceeds the limit of 10 MB");
      return;
    }

    const { file_name } = req.body;
    if (!file_name) {
      throw new Error("No file name provided");
    }

    const fileData = req.file.buffer;
    const sqlInsert =
      "INSERT INTO downloads (file_name, file_data) VALUES (?, ?)";
    db.query(sqlInsert, [file_name, fileData], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err.message);
      } else {
        res.send("File added");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.get("/api/download/", (req, res) => {
  const sqlGet = "SELECT * FROM downloads ORDER BY id DESC";
  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } else {
      res.send(result);
    }
  });
});

app.get("/api/downloadfile/:file_name", (req, res) => {
  const sqlGet = "SELECT * FROM downloads WHERE file_name = ?";
  const file_name = req.params.file_name;

  db.query(sqlGet, [file_name], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    if (result.length === 0) {
      res.sendStatus(404);
      return;
    }

    const fileData = Buffer.from(result[0].file_data, "binary");
    const fileName = result[0].file_name;

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${fileName}`,
      "Content-Length": fileData.length,
    });

    res.send(fileData);
  });
});

app.get("/api/getLoggedInStatus", (req, res) => {
  const isLoggedIn = !!req.session.username;

  res.send(isLoggedIn);
});

app.get("/api/delete/:id", (req, res) => {
  const sqlDelete = "DELETE FROM events WHERE event_id = ?;";

  db.query(sqlDelete, [req.params.id], (err, result) => {
    res.send("Event Deleted");
  });
});
app.get("/api/filedelete/:id", (req, res) => {
  const sqlDelete = "DELETE FROM downloads WHERE id = ?;";

  db.query(sqlDelete, [req.params.id], (err, result) => {
    res.send("File Deleted");
  });
});

app.post("/api/edit/:id", upload.single("event_image"), async (req, res) => {
  const { event_name, event_description, event_image, event_date, event_link } =
    req.body;

  const id = req.params.id;

  let image = req.file ? req.file.buffer : null;
  const imageSize = image ? image.length : 0;

  if (imageSize > MAX_IMAGE_SIZE) {
    console.log("Image size exceeds the limit of 10 MB");
    res.status(400).send("Image size exceeds the limit of 10 MB");
    return;
  }

  // Use a default image if no image was uploaded
  if (!image) {
    image = event_image;
  }
  const sqlInsert =
    "UPDATE events SET event_name = ?, event_description = ?, event_image = ?, event_date = ?, event_link = ? WHERE event_id = ?";
  db.query(
    sqlInsert,
    [event_name, event_description, image, event_date, event_link, Number(id)],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding event to database");
      } else {
        res.send("event edited");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
