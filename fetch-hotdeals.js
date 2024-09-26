
const axios = require('axios');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        const response = await axios.get('https://api.adpick.co.kr/hotdeal?affiliateId=16d844');
        const data = response.data;

        // 데이터를 정적으로 저장
        fs.writeFileSync(path.join(__dirname, 'public', 'hotdeals.json'), JSON.stringify(data));

        console.log('API 데이터를 성공적으로 가져와 저장했습니다.');
    } catch (error) {
        console.error('API 호출 실패:', error.message);
        process.exit(1);
    }
})();
