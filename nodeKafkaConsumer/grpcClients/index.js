const PROTO_PATH = `${__dirname}/protobuf`;

// Image Resize Client Setup
const RESIZE_IMAGE_PROTO_FILE = `${__dirname}/protobuf/resizeimagems.proto`;

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const resizeImagePackageDefinition = protoLoader.loadSync(RESIZE_IMAGE_PROTO_FILE, {
    keepCase: true,
    includeDirs: [PROTO_PATH],
    longs: Number
});
// console.log("grpc.loadPackageDefinition(resizeImagePackageDefinition): ", grpc.loadPackageDefinition(resizeImagePackageDefinition));
const resizeImageProto = grpc.loadPackageDefinition(resizeImagePackageDefinition).resize_image_ms;

const ResizeImageClient = new resizeImageProto.ResizeImageMicroService(
    `${process.env.IMAGE_RESIZE_SERVICE_HOST}:${process.env.IMAGE_RESIZE_SERVICE_PORT}`,
    grpc.credentials.createInsecure()
);




// 
module.exports = {
    ResizeImageClient
};