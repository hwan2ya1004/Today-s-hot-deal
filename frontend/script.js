fetch('/.netlify/functions/hotdeals')
    .then(response => response.json())
    .then(data => {
        const hotdealContainer = document.getElementById('hotdeals-container');
        const deals = data[0].list;  // 제공된 데이터 구조에 맞게 수정

        deals.forEach(deal => {
            const hotdealDiv = document.createElement('div');
            hotdealDiv.className = 'hotdeal';

            hotdealDiv.innerHTML = `
                <h2>${deal.product_name}</h2>
                <img src="${deal.photo}" alt="${deal.product_name}" width="200">
                <p>Original Price: ${deal.price_org} KRW</p>
                <p>Sale Price: ${deal.price_sale} KRW</p>
                <p>Commission: ${deal.commission}</p>
                <a href="${deal.buyurl}" target="_blank" class="click-link">Click to Buy</a>
            `;
            
            hotdealContainer.appendChild(hotdealDiv);
        });
    })
    .catch(error => console.error('Error fetching hot deals:', error));
