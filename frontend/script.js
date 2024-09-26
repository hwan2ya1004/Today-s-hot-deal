fetch('http://localhost:3000/api/hotdeals')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('hotdeals-container');
        data.forEach(deal => {
            const hotdealDiv = document.createElement('div');
            hotdealDiv.className = 'hotdeal';

            hotdealDiv.innerHTML = `
                <h2>${deal.productName}</h2>
                <p>Discount: ${deal.discountRate}%</p>
                <a href="${deal.trackingUrl}" target="_blank" class="click-link" data-id="${deal.id}">Click to Buy</a>
                <p>Clicks: <span id="click-count-${deal.id}">${deal.clickCount}</span></p>
            `;
            
            container.appendChild(hotdealDiv);
        });

        document.querySelectorAll('.click-link').forEach(link => {
            link.addEventListener('click', (event) => {
                const dealId = event.target.getAttribute('data-id');
                trackClick(dealId);
            });
        });
    });

function trackClick(dealId) {
    fetch(`http://localhost:3000/api/hotdeals/click/${dealId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        document.getElementById(`click-count-${dealId}`).textContent = data.clicks;
    })
    .catch(error => console.error('Error:', error));
}
