async function loadProducts() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/USERNAME/REPO/main/products.json');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('خطأ في تحميل المنتجات:', error);
        return [];
    }
}

async function displayProducts() {
    const products = await loadProducts();
    const container = document.getElementById('productsList');
    
    if (products.length === 0) {
        container.innerHTML = '<p>لا توجد منتجات حالياً</p>';
        return;
    }
    
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="discount-badge">-${p.discount}</div>
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="rating">⭐ ${p.rating}</div>
                <div class="price">
                    <span class="new-price">${p.price} ج.م</span>
                    ${p.oldPrice ? `<span class="old-price">${p.oldPrice} ج.م</span>` : ''}
                </div>
                <a href="${p.affiliateLink}" target="_blank" class="buy-btn">
                    🛒 اشترِ من أمازون
                </a>
            </div>
        </div>
    `).join('');
}

displayProducts();
