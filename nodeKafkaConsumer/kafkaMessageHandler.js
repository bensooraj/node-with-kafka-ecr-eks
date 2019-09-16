const TestActions = require('./testActions/aggregator');
const S3Actions = require('./s3Actions/aggregator');

module.exports = async (type, action, params) => {
    
    switch (type) {
        case 'TEST':
            await TestActions[action](params);
            break;
    
        case 'S3':
            await S3Actions[action](params);
            break;
    
        default:
            // Do nothing
            break;
    }
};
