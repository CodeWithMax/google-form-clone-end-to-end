const mongodb = require("mongodb");
const mongoose = require("mongoose");

const school_schema = mongoose.Schema({
  schoolName: {
    type: String,

    required: true,
  },
  score: {
    type: String,
    required: true,
  },

  marksType: {
    type: String,
    required: true,
  },
  passingYear: {
    type: Number,
    required: true,
  },
});
// const school = mongoose.model("school", school_schema);

const workExperience_schema = mongoose.Schema({
  companyName: {
    type: String,

    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
});
// const workExperience = mongoose.model("workExperience", workExperience_schema);
const intermediate_schema = mongoose.Schema({
  collegeName: {
    type: String,

    required: true,
  },
  score: {
    type: String,
    required: true,
  },

  marksType: {
    type: String,
    required: true,
  },
  passingYear: {
    type: Number,
    required: true,
  },
});
// const intermediate = mongoose.model("intermediate", intermediate_schema);
const degree_schema = mongoose.Schema({
  collegeName: {
    type: String,

    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  backlogs: {
    type: String,
    required: true,
  },
  marksType: {
    type: String,
    required: true,
  },
  gradYear: {
    type: Number,
    required: true,
  },
});
// const user_schema = mongoose.Schema({
//   testid: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   useremail: {
//     type: String,
//     required: true,
//   },
//   place: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },
//   score: {
//     type: Number,
//     default: 0,
//     required: true,
//   },
//   college: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   test_attempted: {
//     type: Boolean,
//     default: false,
//     required: true,
//   },
// });

// const degree = mongoose.model("degree", degree_schema);
const user_schema = mongoose.Schema({
  testid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,

    required: false,
  },
  state: {
    type: String,

    required: false,
  },
  postalCode: {
    type: String,

    required: false,
  },
  city: {
    type: String,

    required: false,
  },
  skills: {
    type: String,

    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  degree: degree_schema,
  intermediate: intermediate_schema,
  school: school_schema,
  workExperience: workExperience_schema,
  password: {
    type: String,
    required: true,
  },
  test_attempted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("user", user_schema);
