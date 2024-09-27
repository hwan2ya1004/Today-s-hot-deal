const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const response = await axios.get('https://adpick.co.kr/apis/sdk_shopping_hotdeal.php?affid=16d844');
        console.log('ADPICK API 응답:', response.data); // 응답 데이터를 로그로 확인
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('ADPICK API 요청 실패:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from ADPICK API' }),
        };
    }
};
