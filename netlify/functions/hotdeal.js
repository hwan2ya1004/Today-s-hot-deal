const https = require('https');

exports.handler = async function(event, context) {
    const apiUrl = process.env.ADPICK_API_URL;  // 환경 변수에서 API URL 가져오기

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
                            "Access-Control-Allow-Origin": "*",  // CORS 문제 해결
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
