const https = require('https');

exports.handler = async function(event, context) {
    const apiUrl = 'https://api.adpick.co.kr/hotdeal?affiliateId=16d844';

    return new Promise((resolve, reject) => {
        https.get(apiUrl, (res) => {
            let data = '';

            // 데이터가 수신될 때마다 호출
            res.on('data', (chunk) => {
                data += chunk;
            });

            // 응답 완료 시 호출
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
