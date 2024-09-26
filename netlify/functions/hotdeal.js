const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiUrl = 'https://api.adpick.co.kr/hotdeal?affiliateId=16d844';  // API URL 확인
    
    try {
        // API 요청
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);  // HTTP 상태 코드 반환
        }
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // CORS 문제 해결
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('API 호출 실패:', error.message);  // 오류 메시지 출력
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API 호출 실패: ' + error.message }),
        };
    }
};
