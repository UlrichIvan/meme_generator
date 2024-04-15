require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public", "images"));
  },

  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      Math.random() * 100 + Date.now() + path.extname(file.originalname)
    );
  },
});

const base_filepath = `${__dirname}/public/images`;

const upload = multer({
  storage,
});

app.use(express.json());

app.use(cors("*"));

app.use(express.static(__dirname + "/public"));

app.post("/meme/upload", upload.array("images"), (req, res) => {
  try {
    const files = req.files.map((f) => {
      return {
        url: `${process.env.HOST}/images/${f.filename}`,
      };
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "error occured" });
  }
});

app.get("/meme/upload", (req, res) => {
  fs.readdir(__dirname + "/public/images", (err, files) => {
    let data = [];
    if (err) {
      return res.status(500).json({ error: "error occured" });
    }
    files.forEach((f) => {
      data.push({
        url: `${process.env.HOST}/images/${f}`,
      });
    });
    res.status(200).json(data);
  });
});

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
