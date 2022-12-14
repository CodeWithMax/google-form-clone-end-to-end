require("dotenv").config();
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
    Bucket: "daffodil-fileupload",
    ContentType: type,
    Key: `${name}${type}`,
  };
  console.log("Reached Params:", params);
  return s3.upload(params).promise();
};

module.exports = { uploadFile, s3 };
