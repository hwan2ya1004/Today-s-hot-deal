const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const data = fs.readFileSync(path.join(__dirname, '..', 'public', 'hotdeals.json'), 'utf-8');

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: data,
    };
};
