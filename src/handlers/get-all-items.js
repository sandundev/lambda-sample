// Create clients and set shared const values outside of the handler.

const AWS = require('aws-sdk');
const ssm = new AWS.SSM({region: 'eu-west-1'});

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.getAllItemsHandler = async (event) => {

    const param = await getParameter({
        Name: 'SCP_BASE_URL'
    });

    console.log('base url paramVal3: ', param);

    const response = {
        statusCode: 200,
        body: "response! url: " + param.Parameter.Value
    };

    return response;
}

function getParameter(param) {
    return new Promise(function (success, reject) {
        ssm.getParameter(param, function (err, data) {
            if (err) {
                reject(err);
            } else {
                success(data);
            }
        });
    });
};
