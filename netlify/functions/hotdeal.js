const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiUrl = 'https://api.adpick.co.kr/hotdeal?affiliateId=16d844';

    try {
        // AdPick API 호출
        const response = await fetch(apiUrl);

        // HTTP 응답 상태 확인
        if (!response.ok) {
            throw new Error(`API 호출 오류: HTTP 상태 코드 ${response.status}`);
        }

        // 응답 데이터를 JSON으로 변환
        const data = await response.json();

        // 성공적인 응답 반환
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // CORS 문제 해결
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        // API 호출 또는 데이터 처리 중 오류 발생 시 처리
        console.error('API 호출 중 오류 발생:', error.message);

        // 오류 메시지와 함께 500 상태코드 반환
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API 호출 실패: ' + error.message }),
        };
    }
};
