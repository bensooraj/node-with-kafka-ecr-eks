const AWS = require('aws-sdk');
let s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_USER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_USER_SECRET_ACCESS_KEY
});

module.exports = {
    s3
}