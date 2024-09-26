const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const response = await axios.get('https://adpick.co.kr/apis/sdk_shopping_hotdeal.php?affid=16d844');
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data from ADPICK API' }),
        };
    }
};
