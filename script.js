const PRODUCTS_URL = 'https://hassanegypt139-max.github.io/mushaf-store/products.json';

let allProducts = [];
let currentFilter = 'all';

async function loadProducts() {
    try {
        const response = await fetch(PRODUCTS_URL + '?t=' + Date.now());
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        
        allProducts = [...(data.amazon || []), ...(data.noon || [])];
        
        if (data.lastUpdate) {
            const updateEl = document.getElementById('lastUpdate');
            if (updateEl) {
                updateEl.textContent = '🔄 آخر تحديث: ' + data.lastUpdate;
            }
        }
        
        displayProducts();
    } catch (error) {
        console.error('خطأ:', error);
        const listEl = document.getElementById('productsList');
        if (listEl) {
            listEl.innerHTML = '<div class="loading"><p>❌ خطأ في التحميل</p><p style="font-size:12px;color:#999">تأكد من الاتصال بالإنترنت</p></div>';
        }
    }
}

function displayProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    if (allProducts.length === 0) {
        container.innerHTML = '<div class="loading"><p>لا توجد منتجات</p></div>';
        return;
    }
    
    container.innerHTML = allProducts.map(p => `
        <div class="product-card" data-category="${p.category || 'other'}" data-store="${p.store}">
            <div class="store-badge ${p.store}">
                ${p.store === 'amazon' ? '🛒 أمازون' : '🛍️ نون'}
            </div>
            ${p.discount ? `<div class="discount-badge">-${p.discount}</div>` : ''}
            <img src="${p.image}" alt="${p.name}" loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/200x200/0f5132/d4af37?text=منتج'">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="rating">⭐ ${p.rating || '4.5'}</div>
                <div class="price">
                    <span class="new-price">${p.price} ج.م</span>
                    ${p.oldPrice ? `<span class="old-price">${p.oldPrice} ج.م</span>` : ''}
                </div>
                <a href="${p.affiliateLink}" target="_blank" 
                   class="buy-btn ${p.store === 'noon' ? 'noon' : ''}"
                   onclick="trackClick('${p.store}', '${p.id}')">
                    🛒 اشترِ الآن
                </a>
            </div>
        </div>
    `).join('');
}

function filterByCategory(category, btn) {
    currentFilter = category;
    if (btn) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    document.querySelectorAll('.product-card').forEach(card => {
        const store = card.dataset.store;
        if (category === 'all') card.style.display = 'block';
        else if (category === 'amazon' || category === 'noon') card.style.display = store === category ? 'block' : 'none';
        else card.style.display = card.dataset.category === category ? 'block' : 'none';
    });
}

function filterProducts() {
    const searchEl = document.getElementById('searchInput');
    if (!searchEl) return;
    const query = searchEl.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        const nameEl = card.querySelector('h3');
        if (!nameEl) return;
        const name = nameEl.textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

function trackClick(store, productId) {
    console.log('🛒 نقر على:', store, productId);
}

document.addEventListener('DOMContentLoaded', loadProducts);
setInterval(loadProducts, 5 * 60 * 1000);
