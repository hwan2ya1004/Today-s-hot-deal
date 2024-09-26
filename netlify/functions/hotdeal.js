const https = require('https');

exports.handler = async function(event, context) {
    const apiUrl = process.env.ADPICK_API_URL;

    return new Promise((resolve, reject) => {
        https.get(apiUrl, (res) => {
            let data = '';

            console.log(`응답 상태 코드: ${res.statusCode}`);  // 응답 상태 코드 출력

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return reject({
                        statusCode: res.statusCode,
                        body: JSON.stringify({ error: `API 오류: 상태 코드 ${res.statusCode}` }),
                    });
                }

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
                        body: JSON.stringify({ error: 'JSON 파싱 오류: ' + error.message }),
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
