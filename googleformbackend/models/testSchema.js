const mongodb = require("mongodb");
const mongoose = require("mongoose");

const option_schema = mongoose.Schema({
  optionText: {
    type: String,
    required: true,
  },
});

const question_schema = mongoose.Schema({
  questionType: {
    type: String,
    required: true,
  },
  options: [option_schema],
  open: {
    type: Boolean,
  },
  required: {
    type: Boolean,
  },
  questionText: {
    type: String,
  },
  answer: {
    type: Boolean,
  },
  answerText: {
    type: String,
  },
  points: {
    type: Number,
  },
});

//document_schema is same as test schema
const testSchema = mongoose.Schema({
  // document name same as test name
  testName: {
    type: String,
    required: true,
  },
  testCategory: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    default: "",
  },

  startTime: {
    type: Date,
    default: "",
  },

  endTime: {
    type: Date,
    default: "",
  },
  negativeMark: {
    type: Number,
    default: 0,
  },

  cutOff: {
    type: Number,
    default: 0,
  },
  compensation: {
    type: String,
    default: "Not disclosed",
  },
  jobSkills: {
    type: String,
    default: "",
  },

  sections: {
    type: Number,
    default: 1,
  },

  calculator: {
    type: Boolean,
    default: false,
  },

  randomizeQuestions: {
    type: Boolean,
    default: false,
  },

  negativeMarking: {
    type: Boolean,
    default: false,
  },
  doc_desc: {
    type: String,
    default: "",
  },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  questions: [question_schema],
  date: { type: Date, default: Date.now },
  scheduleDate: { type: Date, default: "" },
});

module.exports = mongoose.model("test", testSchema);

// Version 2
// const mongodb = require("mongodb");
// const mongoose = require("mongoose");

// const option_schema = mongoose.Schema({
//   optionText: {
//     type: String,
//     required: true,
//   },
// });

// const question_schema = mongoose.Schema({
//   questionType: {
//     type: String,
//     required: true,
//   },
//   options: [option_schema],
//   open: {
//     type: Boolean,
//   },
//   required: {
//     type: Boolean,
//   },
//   questionText: {
//     type: String,
//   },
//   answer: {
//     type: Boolean,
//   },
//   answerText: {
//     type: String,
//   },
//   points: {
//     type: Number,
//   },
// });

// //document_schema is same as test schema
// const testSchema = mongoose.Schema({
//   // document name same as test name
//   document_name: {
//     type: String,
//     required: true,
//   },
//   testCategory: {
//     type: String,
//     required: true,
//   },

//   JobTitle: {
//     type: String,
//     default: "",
//   },
//   JobSkills: {
//     type: String,
//     default: "",
//   },
//   startTime: {
//     type: time,
//     default: "",
//   },

//   negativeMark: {
//     type: Number,
//     default: 0,
//   },

//   cutOff: {
//     type: Number,
//     default: 0,
//   },
//   JobSkills: {
//     type: String,
//     default: "",
//   },

//   sections: {
//     type: Number,
//     default: 0,
//   },

//   calculator: {
//     type: Boolean,
//     default: false,
//   },

//   randomizeQuestions: {
//     type: Boolean,
//     default: false,
//   },

//   negativeMarking: {
//     type: Boolean,
//     default: false,
//   },
//   doc_desc: {
//     type: String,
//     required: true,
//   },
//   adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
//   questions: [question_schema],
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("test", testSchema);
