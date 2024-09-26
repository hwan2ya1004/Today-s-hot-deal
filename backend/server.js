const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 프록시 API 엔드포인트
app.get('/api/hotdeals', async (req, res) => {
    try {
        const response = await axios.get('https://adpick.co.kr/apis/sdk_shopping_hotdeal.php?affid=16d844');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from ADPICK API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
