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
    cb(
      null,
      Math.random() * 100 + Date.now() + path.extname(file.originalname)
    );
  },
});

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
        ext: path.extname(f.filename).replace(".", ""),
        filename: f.filename,
      };
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "error occured" });
  }
});

app.patch("/memes/delete", (req, res) => {
  let file = req.body?.file ?? null;
  if (file && fs.existsSync(__dirname + "/public/images/" + file.filename))
    fs.rm(__dirname + "/public/images/" + file.filename, (err) => {
      if (err) {
        res.status(500).json(null);
      }
      res.status(200).json({ ok: true, file });
    });
  else {
    res.status(500).json(null);
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
        ext: path.extname(f)?.replace(".", ""),
        filename: f,
      });
    });
    res.status(200).json(data);
  });
});

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
