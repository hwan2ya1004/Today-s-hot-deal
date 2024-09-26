const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const hotDeals = [
    { id: 1, productName: "Product A", discountRate: 30, productUrl: "https://example.com/a", trackingUrl: "https://adpick-tracking.com/a", clickCount: 0 },
    { id: 2, productName: "Product B", discountRate: 50, productUrl: "https://example.com/b", trackingUrl: "https://adpick-tracking.com/b", clickCount: 0 },
    { id: 3, productName: "Product C", discountRate: 20, productUrl: "https://example.com/c", trackingUrl: "https://adpick-tracking.com/c", clickCount: 0 }
];

app.use(cors());
app.use(express.json());

app.get('/api/hotdeals', (req, res) => {
    res.json(hotDeals);
});

app.post('/api/hotdeals/click/:id', (req, res) => {
    const { id } = req.params;
    const deal = hotDeals.find(hotDeal => hotDeal.id === parseInt(id));
    if (deal) {
        deal.clickCount++;
        res.json({ message: `Hotdeal ${deal.productName} clicked!`, clicks: deal.clickCount });
    } else {
        res.status(404).json({ message: 'Hotdeal not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
