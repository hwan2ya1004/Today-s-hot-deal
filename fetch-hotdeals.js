const axios = require('axios');  // axios 모듈을 사용하여 API 호출
const fs = require('fs');  // 파일 시스템 모듈
const path = require('path');  // 경로 모듈

(async () => {
    try {
        // AdPick API 호출
        const response = await axios.get('https://api.adpick.co.kr/hotdeal?affiliateId=16d844');
        
        // API 응답에서 데이터를 가져와 JSON 파일로 저장
        const data = response.data;

        // 데이터를 저장할 파일 경로 설정 (public/hotdeals.json)
        fs.writeFileSync(path.join(__dirname, 'public', 'hotdeals.json'), JSON.stringify(data));

        console.log('API 데이터를 성공적으로 가져와 저장했습니다.');
    } catch (error) {
        console.error('API 호출 실패:', error.message);  // 404 오류 발생 시 메시지 출력
        process.exit(1);  // 오류가 발생하면 스크립트를 종료
    }
})();
