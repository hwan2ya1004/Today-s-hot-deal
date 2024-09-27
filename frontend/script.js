fetch('/.netlify/functions/hotdeals')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            // 배열이면 정상적으로 처리
            data.forEach(deal => {
                renderHotdeal(deal); // 핫딜 렌더링 함수
            });
        } else {
            // 배열이 아니면 단일 객체 처리
            renderHotdeal(data);
        }
    })
    .catch(error => console.error('Error fetching hot deals:', error));

function renderHotdeal(deal) {
    const container = document.getElementById('hotdeals-container');
    const hotdealDiv = document.createElement('div');
    hotdealDiv.className = 'hotdeal';

    hotdealDiv.innerHTML = `
        <h2>${deal.title}</h2>
        <img src="${deal.img}" alt="${deal.title}" width="200">
        <p>Original Price: ${deal.org_price} KRW</p>
        <p>Sale Price: ${deal.price} KRW</p>
        <a href="${deal.product_url}" target="_blank" class="click-link">Click to Buy</a>
    `;
    
    container.appendChild(hotdealDiv);
}
