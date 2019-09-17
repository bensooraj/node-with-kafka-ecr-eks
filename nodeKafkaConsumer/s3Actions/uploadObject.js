const fs = require('fs'),
    path = require('path'),
    util = require('util');

const { s3 } = require('../util/util')
const { ResizeImageClient } = require('../grpcClients');

const uploadImage = async (params) => {
    console.log("params: ", params);
    const imageID = params.image_id;
    const imageFileName = params.image_filename;

    const contentType = ((f) => {
        const extName = path.extname(f);
        if (extName === '.jpeg') return 'image/jpeg';
        if (extName === '.jpg') return 'image/jpeg';
        if (extName === '.png') return 'image/png';
    })(imageFileName);

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${imageID}/${imageFileName}`,
        Body: fs.createReadStream(`image_uploads/${imageFileName}`),
        ContentType: contentType,
        ACL: 'public-read'
    };

    // await s3.upload({
    //     ...s3Params,
    // }).promise().catch((error) => {
    //     console.log("S3 Upload Error: ", error);
    // });

    // Call the Go GRPC Microservice for resizing the image and uploading
    // them to s3

    await new Promise((resolve, reject) => {
        ResizeImageClient.ResizeImage({
            image_id: imageID,
            image_filename: imageFileName
        }, function (err, response) {
            if (err) {
                console.log("resizeImagePromise | Error: ", err);
                reject(err);
                return;
            }
            console.log("resizeImagePromise | response: ", response);
            resolve(response);
            return;
        })
    });

    return;
};



module.exports = {

    UPLOAD_IMAGE: uploadImage,

};