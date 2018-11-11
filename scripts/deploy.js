const fs = require("fs");
const readdir = require("recursive-readdir");
const mime = require("mime-types");

const AWS = require("aws-sdk");

const { appBuild } = require("../config/paths");

const s3 = new AWS.S3();
const params = {
  Bucket: "portfolio.traveltart.in",
  ACL: "public-read"
};

function getFiles(dirPath) {
  return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}

async function buildUploader() {
  //get files to upload
  let filesToUpload = await getFiles(appBuild);
  const files = filesToUpload
    .filter(name => !name.endsWith(".map"))
    .map(function(name) {
      return {
        Key: name.replace(`${appBuild}\\`, "").replace(/\\/g, "/"),
        ContentType: mime.lookup(name),
        Body: name
      };
    });

  for (let file of files) {
    const fileparams = {
      ...file,
      ...params,
      ...{ Body: fs.readFileSync(file["Body"]) }
    };
    try {
      await s3.upload(fileparams).promise();
    } catch (err) {
      console.log(err);
    }
  }
}

buildUploader();
