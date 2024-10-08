const CACHE_KEY = 'hotdealCache';
const CACHE_TIME_KEY = 'hotdealCacheTime';
const CACHE_DURATION = 60 * 1000; // 1분(60초) 캐시 유지 시간

function getCachedDeals() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (cachedData && cachedTime) {
        const now = new Date().getTime();
        // 캐시된 데이터가 1분 이내이면 캐시 사용
        if (now - cachedTime < CACHE_DURATION) {
            return JSON.parse(cachedData);
        }
    }
    return null;
}

function setCachedDeals(data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, new Date().getTime());
}

function fetchHotDeals() {
    // 캐시된 데이터를 먼저 확인
    const cachedDeals = getCachedDeals();
    if (cachedDeals) {
        renderHotDeals(cachedDeals);
        console.log('캐시에서 데이터를 가져왔습니다.');
    } else {
        // 캐시된 데이터가 없으면 API를 호출
        fetch('/.netlify/functions/hotdeals')
            .then(response => response.json())
            .then(data => {
                setCachedDeals(data[0].list); // 데이터를 캐시에 저장
                renderHotDeals(data[0].list);
                console.log('API에서 데이터를 가져왔습니다.');
            })
            .catch(error => console.error('Error fetching hot deals:', error));
    }
}

// 가격을 한국식 표기로 변환하는 함수
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
}

// 핫딜 데이터를 화면에 표시
function renderHotDeals(deals) {
    const hotdealContainer = document.getElementById('hotdeals-container');
    hotdealContainer.innerHTML = ''; // 기존 내용 초기화

    deals.forEach(deal => {
        const hotdealDiv = document.createElement('div');
        hotdealDiv.className = 'hotdeal';

        hotdealDiv.innerHTML = `
            <h2>${deal.product_name}</h2>
            <img src="${deal.photo}" alt="${deal.product_name}" width="200">
            <p class="original-price">정가: ${formatPrice(deal.price_org)}</p>
            <p class="sale-price">할인가: <span>${formatPrice(deal.price_sale)}</span></p>
            <a href="${deal.buyurl}" target="_blank" class="click-link">Click to Buy</a>
        `;
        
        hotdealContainer.appendChild(hotdealDiv);
    });
}

// 페이지 로드 시 핫딜 정보 가져오기
fetchHotDeals();
