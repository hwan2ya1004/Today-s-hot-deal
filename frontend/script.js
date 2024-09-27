fetch('/.netlify/functions/hotdeals')
    .then(response => response.json())
    .then(data => {
        console.log('API 데이터:', data); // 콘솔에 데이터 출력

        const container = document.getElementById('hotdeals-container');
        data.forEach(deal => {
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
        });
    })
    .catch(error => console.error('Error fetching hot deals:', error));
