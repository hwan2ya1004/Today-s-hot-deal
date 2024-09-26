// ADPICK API를 호출하여 핫딜 목록 가져오기
fetch('https://adpick.co.kr/apis/sdk_shopping_hotdeal.php?affid=16d844')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('hotdeals-container');
        
        // 핫딜 데이터가 배열로 반환된다고 가정하고 각 핫딜을 표시
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
