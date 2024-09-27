const CACHE_KEY = 'hotdealCache';
const CACHE_TIME_KEY = 'hotdealCacheTime';
const CACHE_DURATION = 60 * 1000; // 1분(60초) 캐시 유지 시간

// 캐시된 핫딜 데이터를 로컬 스토리지에서 가져옴
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

// 핫딜 데이터를 로컬 스토리지에 저장
function setCachedDeals(data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, new Date().getTime());
}

// API 또는 캐시에서 핫딜 데이터를 가져옴
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
                if (data && data[0] && data[0].list) {
                    setCachedDeals(data[0].list); // 데이터를 캐시에 저장
                    renderHotDeals(data[0].list); // 데이터를 화면에 렌더링
                    console.log('API에서 데이터를 가져왔습니다.');
                } else {
                    console.error('API 응답 데이터가 유효하지 않습니다.');
                }
            })
            .catch(error => console.error('Error fetching hot deals:', error));
    }
}

// 핫딜 데이터를 화면에 표시 (기존 데이터에 추가)
function renderHotDeals(deals) {
    const hotdealContainer = document.getElementById('hotdeals-container');
    
    deals.forEach(deal => {
        // 중복된 상품인지 확인 (상품명이나 상품 코드를 기준으로 중복 체크)
        const existingDeal = document.querySelector(`[data-product-code="${deal.product_code}"]`);
        if (!existingDeal) {
            const hotdealDiv = document.createElement('div');
            hotdealDiv.className = 'hotdeal';
            hotdealDiv.setAttribute('data-product-code', deal.product_code); // 중복 체크를 위한 식별자 설정

            hotdealDiv.innerHTML = `
                <h2>${deal.product_name}</h2>
                <img src="${deal.photo}" alt="${deal.product_name}" width="200">
                <p>Original Price: ${deal.price_org} KRW</p>
                <p>Sale Price: ${deal.price_sale} KRW</p>
                <p>Commission: ${deal.commission}</p>
                <a href="${deal.buyurl}" target="_blank" class="click-link">Click to Buy</a>
            `;
            
            hotdealContainer.appendChild(hotdealDiv);
        }
    });
}

// 페이지 로드 시 핫딜 정보 가져오기
fetchHotDeals();
