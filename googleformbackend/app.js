require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const Excel = require("exceljs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");

const jwt = require("jsonwebtoken");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
let allowedOrigins = "*";
const corsConfig = {
  origin: allowedOrigins,
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "x-auth-token",
  ],
  maxAge: 86400, // NOTICE: 1 day
  credentials: false,
};

app.use(cors(corsConfig));
const { TokenFileWebIdentityCredentials } = require("aws-sdk");
const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");

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
// require("dotenv").config()
const AWS = require("aws-sdk");

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: `AKIAV34NAGL4CPCXKSGU`,
  secretAccessKey: `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`,
  signatureVersion: "v4",
  region: "ap-south-1",
});

// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    Body: buffer,
    Bucket: "recruit-techie-2022",
    ContentType: type,
    Key: `${name}${type}`,
  };
  console.log("Reached Params:", params);
  return s3.upload(params).promise();
};

const uploadResume = (request, response, next) => {
  const form = new multiparty.Form();
  console.log("UPload resume is called");
  form.parse(request, async (error, fields, files) => {
    if (error) {
      console.log("Error in 73line");
      return response.status(500).send(error);
    }
    try {
      let d = files.myFile[0].path;
      console.log(files.myFile[0]);
      const filePath = d;
      // const type = await path.extname(filePath);
      // const buffer = await fs.readFileSync(filePath);
      // const fileName = `/${Date.now().toString()}`;
      // console.log(filePath, type, buffer, fileName);
      // const data = await uploadFile(buffer, fileName, type);
      // console.log(data);
      // const signedUrlExpireSeconds = 60000 * 1;

      // var imageKey = data.Key;
      // var params = { Bucket: "recruit-techie-2022", Key: imageKey }; // keyname can be a filename
      // console.log("imagef  file ; ", data.Location);
      // let result = {
      //   fileLink: data.Location,
      //   fileName: fields.fileName[0],
      //   fileKey: params.Key,
      // };
      // const _id = fields.childId[0];
      // const profileName = fields.fileName[0];

      console.log(profileName, result, "line 60");
      // if (profileName == "PROFILE-PIC") {
      //   const success = await Child.findByIdAndUpdate(
      //     _id,
      //     {
      //       profile: data.Location,
      //     },
      //     { new: true }
      //   );
      //   if (!success) return res.status(400).json({ msg: "child not found" });
      //   return response
      //     .status(200)
      //     .json({ mag: "file uploaded successfully", data: result });
      // } else {
      //   const obj = {
      //     fileLink: data.Location,
      //     fileName: fields.fileName[0],
      //     fileKey: params.Key,
      //     childId: _id,
      //     centerId: request.query.center,
      //     auditLog: {},
      //   };
      //   let record = new Records(obj);
      //   const auditLog = {
      //     By: request.user.id,
      //     On: new Date().getTime() + 5.5 * 60 * 60 * 1000,
      //   };
      //   record.auditLog.created = auditLog;
      //   console.log(record);
      //   const success = await record.save();
      //   if (!success)
      //     return response.status(400).json({ msg: "child not found" });
      //   return response
      //     .status(200)
      //     .json({ mag: "file uploaded successfully", data: result });
      // }
    } catch (err) {
      console.log("Error in 134 line");
      console.log(err);
      return response.status(500).send(err);
    }
  });
};

app.post("/services/records/upload_file", uploadResume);

const test = require("./models/testSchema");
const Admin = require("./models/AdminuserSchema");

const user = require("./models/userSchema");

const AdminAuth = require("./Auth/AdminAuth");
const { DefaultSerializer } = require("v8");

app.use(AdminAuth);

// app.get("/sendsms", (req, res) => {
//   let transporter = nodeMailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,

//     auth: {
//       user: "recruit.techie2022@gmail.com",
//       pass: "recruit_techie@2022",
//     },
//     secure: "true",
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });
//   let mailOptions = {
//     from: "recruit.techie2022@gmail.com", // sender address
//     to: "sudeepmanaali@gmail.com", // list of receivers
//     subject: "From retcruit techie test mail", // Subject line
//     text: "recruit ment test link", // plain text body
//     html: "<b>NodeJS Email Tutorial</b>", // html body
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message %s sent: %s", info.messageId, info.response);
//     res.render("index");
//   });
// });
app.get("/get_all_files", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    console.log(req.isAdminAuth);
    res.status(401).send({ msg: "Unauthorised resource access..!" });
  }

  console.log(req.userId);

  try {
    test
      .find({ adminId: req.userId })
      .sort([["date", -1]])
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.post("/get_all_files/search", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    console.log(req.isAdminAuth);
    res.status(401).send({ msg: "Unauthorised resource access..!" });
  }
  console.log(req.body);
  const searchText = req.body.search;
  try {
    test
      .find({
        adminId: req.userId,
        testName: { $regex: searchText, $options: "i" },
      })
      .sort([["date", -1]])
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/documents/:doc_id", (req, res) => {
  fs.readFile(`files/${req.params.doc_id}.json`, (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    res.send(student);
  });
});

app.get("/data/:doc_id", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    console.log(req.isAdminAuth);
    res.status(401).send({ msg: "Unauthorised resource access..!" });
  }

  try {
    var docId = req.params?.doc_id;

    test.find({ _id: docId }).then((ree) => {
      console.log(res);
      res.status(200).send(ree[0]);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/testdata/:doc_id", (req, res) => {
  try {
    var docId = req.params?.doc_id;

    test.find({ _id: docId }).then((ree) => {
      console.log(res);
      res.status(200).send(ree[0]);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post(`/updateScore`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
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

app.post(`/enable`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
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

app.post(`/disable`, (req, res) => {
  try {
    var { userid, testId } = req.body;

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
    res.status(200).send("DATA updated ...!");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put(`/add_questions/:testId`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
  console.log(req.body);
  try {
    var docs_data = req.body;
    var testId = req.params.testId;

    let data = JSON.stringify(docs_data);
    var testData = req.body;
    test
      .updateOne(
        { _id: testId },
        {
          $set: {
            questions: testData.questionsData,
          },
        }
      )
      .then((result) => {
        console.log(result);
        res.status(200).send("Test question updated!");
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.post("/addAdminUser", (req, res) => {
  console.log("added admin");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body?.useremail;
  const name = req.body?.username;
  const phone = req.body?.phone;
  const password = req.body?.password;

  if (!email || !name || !phone || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  } else {
    bcrypt.hash(password, 12).then((hashedPw) => {
      const adminData = {
        username: name,
        useremail: email,
        phone: phone,
        password: password,
      };

      let admin = new Admin(adminData);
      admin.save((err) => {
        if (err) {
          res.status(500).send({ msg: err.message });
        } else {
          res.status(200).send({ msg: "Admin added successfully..." });
        }
      });
    });
  }
});

app.get("/get_all_adminusers", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }

  try {
    Admin.find()

      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.useremail;
  const password = req.body.password;
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  Admin.find({ useremail: email, password: password }).then((result) => {
    if (result.length > 0) {
      const token = jwt.sign(
        {
          email: result[0].useremail,
          name: result[0].username,
          userId: result[0]._id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        msg: "Logged In",
        token: token,
        userId: result[0]._id.toString(),
        rowData: result,
      });
    } else {
      res.status(403).json({ msg: "No user data" });
    }
  });
});

app.post(`/user_register`, (req, res) => {
  try {
    var docs_data = req.body;

    var pass = "";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    console.log(req.body);
    docs_data.password = pass;

    var user_one = new user(docs_data);
    user_one.save((err) => {
      if (err) throw new Error(err);
      else {
        res.status(200).send({
          message: "User created successfully..!",

          testlink: ` https://test-window-2022.herokuapp.com/welcome-window/${docs_data.testid}`,
          password: pass,
        });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post(`/signin`, (req, res) => {
  try {
    var docs_data = req.body;
    console.log(docs_data);
    // user
    //   .find({
    //     testid: docs_data.tid,
    //     password: docs_data.password,
    //     useremail: docs_data.email,
    //     test_attempted: false,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     res.status(200).send(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (!docs_data.email || !docs_data.password || !docs_data.tid)
      return res.status(400).json({ msg: "Please enter all fields" });

    user
      .find({ email: docs_data.email, password: docs_data.password })
      .then((result) => {
        if (result.length > 0) {
          const token = jwt.sign(
            {
              email: result[0].email,
              name: result[0].firstName + " " + result[0].lastName,
              userId: result[0]._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "1d" }
          );

          console.log({
            msg: "Logged In",
            token: token,
            testUserId: result[0]._id.toString(),
            rowData: result[0],
          });
          res.status(200).json({
            msg: "Logged In",
            token: token,
            testUserId: result[0]._id.toString(),
            rowData: result[0],
          });
        } else {
          res.status(403).json({ msg: "No user data" });
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get(`/users`, (req, res) => {
  try {
    user
      .find()
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

app.delete(`/deleteqp/:doc_id`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
  try {
    var name = req.params?.doc_id;

    test.remove({ _id: name }, function (err) {
      if (!err) {
        res.status(200).json({ msg: "Record Deleted Successfully..." });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post(`/createTest`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }

  try {
    let data = req.body.test;

    combineDateAndTime = function (date, time) {
      timeString = time + ":00";

      var year = date.getFullYear();
      var month = date.getMonth() + 1; // Jan is 0, dec is 11
      var day = date.getDate();
      var dateString = "" + year + "-" + month + "-" + day;
      var combined = new Date(dateString + " " + timeString);

      return combined;
    };

    let testData = new test({
      ...data,
      startTime: combineDateAndTime(
        new Date(data.scheduleDate),
        data.startTime
      ),
      endTime: combineDateAndTime(new Date(data.scheduleDate), data.endTime),

      adminId: req.userId,
    });

    testData.save((err) => {
      if (err) console.log(err);
      else {
        console.log(err);
        res.status(200).send("Test created successfully..!");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("*", (req, res) => {
  res.send("This route is not present ");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("expresss server is running at port nnumber 3000");
});

/*
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const Excel = require("exceljs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
let allowedOrigins = "*";
const corsConfig = {
  origin: allowedOrigins,
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "x-auth-token",
  ],
  maxAge: 86400, // NOTICE: 1 day
  credentials: false,
};

app.use(cors(corsConfig));
const { TokenFileWebIdentityCredentials } = require("aws-sdk");
const fs = require("fs");
const multiparty = require("multiparty");
const path = require("path");

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
// require("dotenv").config()
const AWS = require("aws-sdk");

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  signatureVersion: "v4",
  region: "ap-south-1",
});

// create S3 instance
const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    Body: buffer,
    Bucket: "react-techie-2022",
    ContentType: type,
    Key: `${name}${type}`,
  };
  console.log("Reached Params:", params);
  return s3.upload(params).promise();
};

const uploadResume = (request, response, next) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response.status(500).send(error);
    }
    try {
      const filePath = files.myFile[0].path;
      const type = await path.extname(filePath);
      const buffer = await fs.readFileSync(filePath);
      const fileName = `/${Date.now().toString()}`;
      console.log(filePath, type, buffer, fineName);
      const data = await uploadFile(buffer, fileName, type);

      const signedUrlExpireSeconds = 60000 * 1;

      var imageKey = data.Key;
      var params = { Bucket: "recruit-techie-2022", Key: imageKey }; // keyname can be a filename

      let result = {
        fileLink: data.Location,
        fileName: fields.fileName[0],
        fileKey: params.Key,
      };
      const _id = fields.childId[0];
      const profileName = fields.fileName[0];

      console.log(profileName, result, "line 60");
      // if (profileName == "PROFILE-PIC") {
      //   const success = await Child.findByIdAndUpdate(
      //     _id,
      //     {
      //       profile: data.Location,
      //     },
      //     { new: true }
      //   );
      //   if (!success) return res.status(400).json({ msg: "child not found" });
      //   return response
      //     .status(200)
      //     .json({ mag: "file uploaded successfully", data: result });
      // } else {
      //   const obj = {
      //     fileLink: data.Location,
      //     fileName: fields.fileName[0],
      //     fileKey: params.Key,
      //     childId: _id,
      //     centerId: request.query.center,
      //     auditLog: {},
      //   };
      //   let record = new Records(obj);
      //   const auditLog = {
      //     By: request.user.id,
      //     On: new Date().getTime() + 5.5 * 60 * 60 * 1000,
      //   };
      //   record.auditLog.created = auditLog;
      //   console.log(record);
      //   const success = await record.save();
      //   if (!success)
      //     return response.status(400).json({ msg: "child not found" });
      //   return response
      //     .status(200)
      //     .json({ mag: "file uploaded successfully", data: result });
      // }
    } catch (err) {
      return response.status(500).send(err);
    }
  });
};

app.post("/services/records/upload_file", uploadResume);

const document = require("./models/documentSchema");
const Admin = require("./models/AdminuserSchema");

const user = require("./models/userSchema");

const AdminAuth = require("./Auth/AdminAuth");

app.use(AdminAuth);

app.get("/get_all_files", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    console.log(req.isAdminAuth);
    res.status(401).send({ msg: "Unauthorised resource access..!" });
  }

  console.log(req.userId);

  try {
    document
      .find({ adminId: req.userId })
      .sort([["date", -1]])
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.post("/get_all_files/search", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    console.log(req.isAdminAuth);
    res.status(401).send({ msg: "Unauthorised resource access..!" });
  }
  console.log(req.body);
  const searchText = req.body.search;
  try {
    document
      .find({
        adminId: req.userId,
        document_name: { $regex: searchText, $options: "i" },
      })
      .sort([["date", -1]])
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/documents/:doc_id", (req, res) => {
  fs.readFile(`files/${req.params.doc_id}.json`, (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    res.send(student);
  });
});

app.get("/data/:doc_id", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    console.log(req.isAdminAuth);
    res.status(401).send({ msg: "Unauthorised resource access..!" });
  }

  try {
    var docId = req.params?.doc_id;

    document.find({ _id: docId }).then((ree) => {
      res.status(200).send(ree[0]);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post(`/updateScore`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
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

app.post(`/enable`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
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

app.post(`/disable`, (req, res) => {
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

app.post(`/add_questions/:doc_id`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
  try {
    var docs_data = req.body;
    var name = req.params.doc_id;

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
          res.status(200).send("Documnet saved!");
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/addAdminUser", (req, res) => {
  console.log("added admin");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body?.useremail;
  const name = req.body?.username;
  const phone = req.body?.phone;
  const password = req.body?.password;

  if (!email || !name || !phone || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  } else {
    bcrypt.hash(password, 12).then((hashedPw) => {
      const adminData = {
        username: name,
        useremail: email,
        phone: phone,
        password: password,
      };

      let admin = new Admin(adminData);
      admin.save((err) => {
        if (err) {
          res.status(500).send({ msg: err.message });
        } else {
          res.status(200).send({ msg: "Admin added successfully..." });
        }
      });
    });
  }
});

app.get("/get_all_adminusers", AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }

  try {
    Admin.find()

      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.useremail;
  const password = req.body.password;
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  Admin.find({ useremail: email, password: password }).then((result) => {
    if (result.length > 0) {
      const token = jwt.sign(
        {
          email: result[0].useremail,
          name: result[0].username,
          userId: result[0]._id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        msg: "Logged In",
        token: token,
        userId: result[0]._id.toString(),
        rowData: result,
      });
    } else {
      res.status(403).json({ msg: "No user data" });
    }
  });
});

app.post(`/user_register`, (req, res) => {
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
          message: "User created successfully..!",
          testlink: `http://localhost:3001/login/${docs_data.testid}`,
          password: pass,
        });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post(`/signin`, (req, res) => {
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

app.get(`/users`, (req, res) => {
  try {
    user
      .find()
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

app.delete(`/deleteqp/:doc_id`, AdminAuth, (req, res) => {
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }
  try {
    var name = req.params?.doc_id;

    document.remove({ _id: name }, function (err) {
      if (!err) {
        res.status(200).json({ msg: "Record Deleted Successfully..." });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post(`/create_document`, AdminAuth, (req, res) => {
  console.log(req);
  if (!req.isAdminAuth) {
    res.status(401).send("Unauthorised resource access..!");
  }

  try {
    var docs_data = req.body;

    let data = JSON.stringify(docs_data);
    var { document_name, doc_desc, questions } = req.body;

    let doc = new document({
      document_name: document_name,
      doc_desc: doc_desc,
      questions: questions,
      adminId: req.userId,
      sections: req.body.sections,
      time: req.body.time,
    });
    doc.save((err) => {
      if (err) throw new Error(err);
      else {
        res.status(200).send("Document created successfully..!");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("*", (req, res) => {
  res.send("This route is not present ");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("expresss server is running at port nnumber 3000");
});

*/
