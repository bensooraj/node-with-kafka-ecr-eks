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

const { dbConnection, dbQuery } = require('../db');

/* GET images listing */
router.get('/', async function (req, res, next) {

    try {
        const result = await dbQuery(`SELECT * FROM images`);
        return res.json({
            images: result,
            error: null
        });
    } catch (error) {
        console.log("[DB Select Call] Error: ", error);
        return res.json({
            images: [],
            error
        });
    }

});

/* GET images by imageID */
router.get('/:image_id', async function (req, res, next) {

    const imageID = req.params["image_id"];
    try {
        const result = await dbQuery(`SELECT * FROM images WHERE image_id=${dbConnection.escape(imageID)}`);
        return res.json({
            images: result,
            error: null
        });
    } catch (error) {
        console.log("[DB Select Call] Error: ", error);
        return res.json({
            images: [],
            error
        });
    }

});

/* POST image upload */
router.post('/upload', imageUploader.single('image_file'), async function (req, res, next) {

    console.log("req.file: ", req.file);
    // Send message to kafka consumer to upload image to S3
    let recordMetadata = [];
    try {
        recordMetadata = await kafkaProduceMessage(process.env.KAFKA_TOPIC_NAME, {
            type: 'S3',
            action: 'UPLOAD_IMAGE',
            params: {
                image_id: path.parse(req.file.filename).name,
                image_filename: path.parse(req.file.filename).base
            }
        });
    } catch (error) {
        console.log(`[ERROR] POST /upload: `, error);
        return res.json({
            message: "Error uploading/producing message to Kafka.",
            error
        });
    }
    res.json({
        message: "Image upload initiated.",
        image_id: path.parse(req.file.filename).name
    });
});

module.exports = router;
