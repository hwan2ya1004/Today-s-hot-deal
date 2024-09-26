const axios = require('axios');

exports.handler = async function(event, context) {
    const apiUrl = 'https://api.adpick.co.kr/hotdeal?affiliateId=16d844';

    try {
        // axios를 사용하여 API 호출
        const response = await axios.get(apiUrl);

        // 성공적인 응답 반환
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // CORS 문제 해결
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error.message);

        // 오류 발생 시 500 상태 반환
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API 호출 실패: ' + error.message }),
        };
    }
};
