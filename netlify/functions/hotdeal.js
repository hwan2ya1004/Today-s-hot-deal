const https = require('https');

exports.handler = async function(event, context) {
    const apiUrl = 'https://your-api-gateway-endpoint.amazonaws.com/dev/hotdeal';  // AWS API Gateway URL

    return new Promise((resolve, reject) => {
        https.get(apiUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(parsedData),
                    });
                } catch (error) {
                    reject({
                        statusCode: 500,
                        body: JSON.stringify({ error: 'API 응답 처리 실패: ' + error.message }),
                    });
                }
            });
        }).on('error', (error) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({ error: 'API 호출 실패: ' + error.message }),
            });
        });
    });
};
