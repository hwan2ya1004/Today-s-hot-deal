
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/api/hotdeal', async (req, res) => {
    const apiUrl = 'https://api.adpick.co.kr/hotdeal?affiliateId=16d844';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'AdPick API에서 데이터를 가져오는 데 실패했습니다.' });
    }
});

app.listen(port, () => {
    console.log(`프록시 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
