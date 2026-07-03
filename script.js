// ========================================
//  رابط ملف المنتجات
// ========================================
const PRODUCTS_URL = 'https://hassanegypt139-max.github.io/mushaf-store/products.json';

// ========================================
//  تحميل المنتجات من GitHub
// ========================================
async function loadProducts() {
    try {
        // إضافة ?t= للرابط لتجاوز ذاكرة المتصفح المؤقتة (Cache)
        const response = await fetch(PRODUCTS_URL + '?t=' + Date.now());
        if (!response.ok) throw new Error('Network error');
        
        const data = await response.json();
        
        // دمج منتجات أمازون ونون معاً في مصفوفة واحدة
        const allProducts = [...(data.amazon || []), ...(data.noon || [])];
        
        return allProducts;
    } catch (error) {
        console.error('خطأ في تحميل المنتجات:', error);
        return [];
    }
}

// ========================================
//  عرض المنتجات في الصفحة
// ========================================
async function displayProducts() {
    const products = await loadProducts();
    const container = document.getElementById('productsList');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">لا توجد منتجات متاحة حالياً</p>';
        return;
    }
    
    container.innerHTML = products.map(p => `
        <div class="product-card">
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
                <a href="${p.affiliateLink}" target="_blank" class="buy-btn">
                    🛒 اشترِ من ${p.store === 'amazon' ? 'أمازون' : 'نون'}
                </a>
            </div>
        </div>
    `).join('');
}

// تشغيل الدالة عند تحميل الصفحة
displayProducts();
