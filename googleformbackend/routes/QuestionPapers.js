const express = require("express");
const mongoose = require("mongoose");
const document = require("../models/documentSchema");
const user = require("../models/userSchema");

mongoose
  .connect(
    "mongodb+srv://sudeep_manasali:Sudeep%401234@googleformclone.urebd.mongodb.net/google_form_clone?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Moongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });

const router = express.Router();

router.get("/get_all_files", (req, res) => {
  console.log("hhh");
  try {
    document
      .find()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post(`/updateScore`, (req, res) => {
  try {
    var { testid, userid, score } = req.body;

    user.findByIdAndUpdate(
      { _id: userid, testid: testid },
      { score: score },
      function (err, data) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).send({ msg: "DATA updated ...!" });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/enable`, (req, res) => {
  try {
    var { testid, id } = req.body;

    user.findByIdAndUpdate(
      { _id: id, testid: testid },
      { test_attempted: false },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send({ msg: "DATA updated ...!" });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/disable`, (req, res) => {
  try {
    var { userid } = req.body;

    user.findByIdAndUpdate(
      userid,
      { test_attempted: true },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send("DATA updated ...!");
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/add_questions/:doc_id`, (req, res) => {
  try {
    var docs_data = req.body;
    var name = req.params?.doc_id;

    let data = JSON.stringify(docs_data);
    var { document_name, doc_desc, questions } = req.body;

    document.findByIdAndUpdate(
      name,
      {
        document_name: document_name,
        doc_desc: doc_desc,
        questions: questions,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          re3s.status(200).send("DATA updated ...!");
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
