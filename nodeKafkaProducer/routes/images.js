const express = require('express');
const router = express.Router();
const path = require('path');
const shortid = require('shortid');
const { kafkaProduceMessage } = require('../kafkaProducer');

const multer = require('multer');
const imageUploader = multer({
    storage: multer.diskStorage({
        destination: `image_uploads`,
        filename: function (req, file, cb) {
            cb(null, `${shortid.generate()}${path.extname(file.originalname)}`);
        }
    })
});

/* GET images listing */
router.get('/', function (req, res, next) {
    res.json({
        message: "User"
    });
});

/* POST image upload */
router.post('/upload', imageUploader.single('image_file'), function (req, res, next) {

    console.log("req.file: ", req.file);

    kafkaProduceMessage('s3-upload-topic', {
        type: 'S3',
        action: 'UPLOAD_IMAGE',
        params: {
            image_id: path.parse(req.file.filename).name,
            image_filename: path.parse(req.file.filename).base
        }
    }, (error, data) => {

        if (error) {
            return res.json({
                message: "Error uploading image.",
                error,
            });
        }

        res.json({
            message: "Image upload initiated.",
            image_id: path.parse(req.file.filename).name
        });
    });

});

module.exports = router;
