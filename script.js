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
    try {
        const response = await fetch('https://hassanegypt139-max.github.io/mushaf-store/products.json?t=' + Date.now());
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();

        // دمج أمازون ونون مع إضافة خاصية store
        const amazonProducts = (data.amazon || []).map(p => ({ ...p, store: 'amazon' }));
        const noonProducts   = (data.noon   || []).map(p => ({ ...p, store: 'noon'   }));
        return [...amazonProducts, ...noonProducts];

    } catch (error) {
        console.error('خطأ في تحميل المنتجات:', error);
        return [];
    }
}

// ========================================
//  عرض المنتجات في الصفحة
// ========================================
async function displayProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center;width:100%">جارٍ تحميل المنتجات...</p>';

    const products = await loadProducts();

    if (products.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:20px">لا توجد منتجات متاحة حالياً</p>';
        return;
    }

    const placeholderImg = "data:image/svg+xml," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
        '<rect width="200" height="200" fill="#0f5132"/>' +
        '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ' +
        'fill="#d4af37" font-size="16">&#1605;&#1606;&#1578;&#1580;</text></svg>'
    );

    container.innerHTML = products.map(p => {
        const storeName   = p.store === 'amazon' ? 'أمازون' : 'نون';
        const hasDiscount = p.discount && Number(p.discount) > 0;

        return `
        <div class="product-card" data-store="${p.store}" data-category="${escapeHTML(p.category || 'other')}">
            <div class="store-badge ${p.store}">${p.store === 'amazon' ? '&#128722;' : '&#128717;'} ${storeName}</div>
            ${hasDiscount ? `<div class="discount-badge">-${escapeHTML(String(p.discount))}</div>` : ''}
            <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" 
                 onerror="this.src='${placeholderImg}'">
            <div class="product-info">
                <h3>${escapeHTML(p.name)}</h3>
                <div class="rating">&#11088; ${escapeHTML(String(p.rating || '4.5'))}</div>
                <div class="price">
                    <span class="new-price">${escapeHTML(String(p.price))} ج.م</span>
                    ${p.oldPrice ? `<span class="old-price">${escapeHTML(String(p.oldPrice))} ج.م</span>` : ''}
                </div>
                <a href="${escapeHTML(p.affiliateLink)}" target="_blank" rel="noopener noreferrer" class="buy-btn ${p.store === 'noon' ? 'noon' : ''}">
                    &#128722; اشترِ من ${storeName}
                </a>
            </div>
        </div>
        `;
    }).join('');
}

// ========================================
//  تشغيل عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', displayProducts);
