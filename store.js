// ========================================
//  رابط ملف المنتجات
// ========================================
const PRODUCTS_URL = 'https://hassanegypt139-max.github.io/mushaf-store/products.json';

let allProducts = [];
let currentFilter = 'all';
let refreshInterval = null;

// ========================================
//  حماية النصوص من XSS
// ========================================
function escapeHTML(str) {
    if (!str && str !== 0) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}

// ========================================
//  تحميل المنتجات من GitHub
// ========================================
async function loadProducts() {
    const listEl = document.getElementById('productsList');
    if (listEl && allProducts.length === 0) {
        listEl.innerHTML = '<div class="loading"><p>جارٍ تحميل المنتجات...</p></div>';
    }

    try {
        const response = await fetch(PRODUCTS_URL + '?t=' + Date.now());
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();

        const amazonProducts = (data.amazon || []).map(p => ({ ...p, store: 'amazon' }));
        const noonProducts   = (data.noon   || []).map(p => ({ ...p, store: 'noon'   }));
        allProducts = [...amazonProducts, ...noonProducts];

        if (data.lastUpdate) {
            const updateEl = document.getElementById('lastUpdate');
            if (updateEl) {
                updateEl.textContent = 'آخر تحديث: ' + escapeHTML(data.lastUpdate);
            }
        }

        displayProducts();
    } catch (error) {
        console.error('خطأ في تحميل المنتجات:', error);
        if (listEl) {
            listEl.innerHTML = '<div class="loading"><p>حدث خطأ في تحميل المنتجات</p><p style="font-size:12px;color:#999">تأكد من الاتصال بالإنترنت</p></div>';
        }
    }
}

// ========================================
//  عرض المنتجات في الصفحة
// ========================================
function displayProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;

    if (allProducts.length === 0) {
        container.innerHTML = '<div class="loading"><p>لا توجد منتجات متاحة حالياً</p></div>';
        return;
    }

    const placeholderImg = "data:image/svg+xml," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
        '<rect width="200" height="200" fill="#0f5132"/>' +
        '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ' +
        'fill="#d4af37" font-size="16">منتج</text></svg>'
    );

    container.innerHTML = allProducts.map((p, index) => {
        const storeName   = p.store === 'amazon' ? 'أمازون' : 'نون';
        const storeIcon   = p.store === 'amazon' ? '&#128722;' : '&#128717;';
        const hasDiscount = p.discount && Number(p.discount) > 0;
        const safeId      = escapeHTML(String(p.id || index));

        return `
        <div class="product-card" 
             data-category="${escapeHTML(p.category || 'other')}" 
             data-store="${p.store}">
            <div class="store-badge ${p.store}">
                ${storeIcon} ${storeName}
            </div>
            ${hasDiscount ? `<div class="discount-badge">-${escapeHTML(String(p.discount))}</div>` : ''}
            <img src="${escapeHTML(p.image)}" 
                 alt="${escapeHTML(p.name)}" 
                 loading="lazy" 
                 onerror="this.src='${placeholderImg}'">
            <div class="product-info">
                <h3>${escapeHTML(p.name)}</h3>
                <div class="rating">&#11088; ${escapeHTML(String(p.rating || '4.5'))}</div>
                <div class="price">
                    <span class="new-price">${escapeHTML(String(p.price))} ج.م</span>
                    ${p.oldPrice ? `<span class="old-price">${escapeHTML(String(p.oldPrice))} ج.م</span>` : ''}
                </div>
                <a href="${escapeHTML(p.affiliateLink)}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="buy-btn ${p.store === 'noon' ? 'noon' : ''}"
                   data-store="${p.store}" 
                   data-id="${safeId}">
                    &#128722; اشترِ من ${storeName}
                </a>
            </div>
        </div>
        `;
    }).join('');

    container.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackClick(this.dataset.store, this.dataset.id);
        });
    });

    if (currentFilter !== 'all') {
        filterByCategory(currentFilter, document.querySelector('.cat-btn.active'));
    }
}

// ========================================
//  تصفية حسب الفئة أو المتجر
// ========================================
function filterByCategory(category, btn) {
    currentFilter = category;

    if (btn) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    const searchEl = document.getElementById('searchInput');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';

    document.querySelectorAll('.product-card').forEach(card => {
        const store = card.dataset.store;
        const cat   = card.dataset.category;
        const name  = (card.querySelector('h3') || {}).textContent || '';
        const nameLower = name.toLowerCase();

        let matchCategory = true;
        if (category === 'amazon' || category === 'noon') {
            matchCategory = (store === category);
        } else if (category !== 'all') {
            matchCategory = (cat === category);
        }

        let matchSearch = true;
        if (query) {
            matchSearch = nameLower.includes(query);
        }

        card.style.display = (matchCategory && matchSearch) ? 'block' : 'none';
    });
}

// ========================================
//  البحث في المنتجات (مع debounce)
// ========================================
let searchTimer = null;

function filterProducts() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        filterByCategory(currentFilter, document.querySelector('.cat-btn.active'));
    }, 200);
}

// ========================================
//  تتبع النقرات على المنتجات
// ========================================
function trackClick(store, productId) {
    console.log('نقر على:', store, productId);
}

// ========================================
//  تشغيل عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    refreshInterval = setInterval(() => {
        if (!document.hidden) {
            loadProducts();
        }
    }, 5 * 60 * 1000);
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden && refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    } else if (!document.hidden && !refreshInterval) {
        refreshInterval = setInterval(() => {
            if (!document.hidden) loadProducts();
        }, 5 * 60 * 1000);
    }
});
