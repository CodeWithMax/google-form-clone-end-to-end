const express = require("express");
const mongoose = require("mongoose");
const document = require("../models/documentSchema");
const user = require("../models/userSchema");

const router = express.Router();

router.post(`/user_register`, (req, res) => {
  try {
    var docs_data = req.body;

    var pass = "";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    docs_data.password = pass;

    var user_one = new user(docs_data);
    user_one.save((err) => {
      if (err) throw new Error(err);
      else {
        res.status(200).send({
          message: "Document created successfully..!",
          testlink: `http://localhost:3001/login/${docs_data.testid}`,
          password: pass,
        });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/signin`, (req, res) => {
  try {
    var docs_data = req.body;
    console.log(docs_data);
    user
      .find({
        testid: docs_data.tid,
        password: docs_data.password,
        useremail: docs_data.email,
        test_attempted: false,
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
