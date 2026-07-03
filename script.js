/* ========================================
   متجر الشقيري - JavaScript الكامل
   Products, Cart, Filters, Modal, Admin,
   Dark Mode, Language, PWA
   ======================================== */

(function() {
    'use strict';

    // ===== CONFIG =====
    const CONFIG = {
        DATA_URL: 'products.json',
        CART_KEY: 'mushaf_cart',
        DARK_KEY: 'mushaf_dark',
        LANG_KEY: 'mushaf_lang',
        ADMIN_KEY: 'mushaf_admin',
        TOPBAR_KEY: 'mushaf_topbar',
        CUSTOM_PRODUCTS_KEY: 'mushaf_custom_products',
        AMAZON_TAG: 'hassanshukair-21',
        NOON_TAG: '502539',
        BLOG_URL: 'https://hshukairy.blogspot.com/',
        STORE_URL: 'https://hassanegypt139-max.github.io/mushaf-store/',
        DEBOUNCE_MS: 350
    };

    // ===== i18n TRANSLATIONS =====
    const i18n = {
        ar: {
            topBar: 'شحن مجاني على الطلبات فوق 350 جنيه | كود خصم حصري لأتباعنا',
            logoTitle: 'متجر الشقيري',
            logoSub: 'أمازون \u2022 نون',
            heroTitle: 'تسوق <span class="gold">أفضل المنتجات</span> بأقل الأسعار',
            heroDesc: 'اكتشف أحدث العروض والخصومات من أمازون مصر ونون مصر. أكثر من منتج في مختلف الفئات بأسعار تنافسية.',
            statProducts: 'منتج متاح',
            statDiscount: 'خصم حتى',
            statStores: 'متاجر موثوقة',
            filterStore: 'المتجر',
            filterCategory: 'القسم',
            filterPrice: 'نطاق السعر',
            filterRating: 'التقييم',
            filterSort: 'ترتيب حسب',
            clearAll: 'مسح الكل',
            rating4plus: '4 فأعلى',
            rating3plus: '3 فأعلى',
            allRatings: 'كل التقييمات',
            sortDefault: 'الافتراضي',
            sortPriceLow: 'السعر: من الأقل',
            sortPriceHigh: 'السعر: من الأعلى',
            sortRating: 'التقييم الأعلى',
            sortDiscount: 'أكبر خصم',
            sortName: 'الاسم أ-ي',
            showingResults: 'عرض',
            results: 'منتج',
            filters: 'تصفية المنتجات',
            noResultsTitle: 'لا توجد نتائج',
            noResultsDesc: 'جرب تغيير معايير البحث أو التصفية',
            productDetails: 'تفاصيل المنتج',
            buyNow: 'اشتري الآن',
            cartTitle: 'سلة التسوق',
            cartEmpty: 'السلة فارغة',
            cartTotal: 'الإجمالي',
            checkout: 'إتمام الشراء من المتاجر',
            clearCart: 'تفريغ السلة',
            addedToCart: 'تمت الإضافة للسلة',
            removedFromCart: 'تم الحذف من السلة',
            cartCleared: 'تم تفريغ السلة',
            adminTitle: 'لوحة تحكم المنتجات',
            adminList: 'قائمة المنتجات',
            adminAdd: 'إضافة منتج',
            adminExport: 'تصدير',
            formStore: 'المتجر',
            formCategory: 'القسم',
            formName: 'اسم المنتج',
            formPrice: 'السعر (ج.م)',
            formOldPrice: 'السعر قبل الخصم (ج.م)',
            formImage: 'رابط الصورة',
            formAffiliate: 'رابط الأفيليت',
            formRating: 'التقييم (1-5)',
            formDiscount: 'نسبة الخصم %',
            save: 'حفظ المنتج',
            cancel: 'إلغاء',
            exportDesc: 'قم بتصدير ملف products.json الجديد وارفعه على GitHub لتحديث المتجر نهائياً.',
            exportJson: 'تصدير products.json',
            importJson: 'استيراد من ملف',
            exportNote: 'ملاحظة:',
            exportNoteText: ' التغييرات محفوظة محلياً في المتصفح. لتطبيقها على الموقع، حمّل ملف JSON وارفعه على GitHub.',
            footerAbout: 'عن المتجر',
            footerAboutText: 'متجر الشقيري للمواد التجارية - نوفر لك أفضل المنتجات من أكبر المتاجر الإلكترونية في مصر بأقل الأسعار وأفضل العروض.',
            footerLinks: 'روابط سريعة',
            footerCategories: 'الأقسام',
            footerBlog: 'المدونة',
            footerBlogText: 'تابع مدونة الشقيري للمواد التجارية للحصول على أحدث العروض والتخفيضات والمراجعات.',
            footerAffiliate: 'روابط أفيليت | أمازون: hassanshukair-21 | نون: 502539',
            searchPlaceholder: 'ابحث عن منتج...',
            currency: 'ج.م',
            savings: 'توفير',
            feature1: 'شحن سريع وموثوق',
            feature2: 'ضمان الجودة الأصلية',
            feature3: 'خدمة عملاء متميزة',
            feature4: 'إرجاع سهل خلال 30 يوم',
            catElectronics: 'إلكترونيات',
            catMobiles: 'هواتف',
            catParts: 'قطع غيار',
            catFashion: 'أزياء',
            catHome: 'المنزل',
            catBooks: 'كتب',
            catBeauty: 'جمال وعناية',
            catSports: 'رياضة',
            catKids: 'أطفال',
            catAll: 'الكل',
            productSaved: 'تم حفظ المنتج بنجاح',
            productDeleted: 'تم حذف المنتج',
            exportSuccess: 'تم تصدير الملف بنجاح',
            importSuccess: 'تم استيراد المنتجات بنجاح',
            editProduct: 'تعديل',
            deleteProduct: 'حذف'
        },
        en: {
            topBar: 'Free shipping on orders above 350 EGP | Exclusive discount for our followers',
            logoTitle: 'Al-Shukairi Store',
            logoSub: 'Amazon \u2022 Noon',
            heroTitle: 'Shop the <span class="gold">Best Products</span> at Lowest Prices',
            heroDesc: 'Discover the latest deals and discounts from Amazon Egypt and Noon Egypt. Hundreds of products across categories at competitive prices.',
            statProducts: 'Products Available',
            statDiscount: 'Discount Up To',
            statStores: 'Trusted Stores',
            filterStore: 'Store',
            filterCategory: 'Category',
            filterPrice: 'Price Range',
            filterRating: 'Rating',
            filterSort: 'Sort By',
            clearAll: 'Clear All',
            rating4plus: '4 & Up',
            rating3plus: '3 & Up',
            allRatings: 'All Ratings',
            sortDefault: 'Default',
            sortPriceLow: 'Price: Low to High',
            sortPriceHigh: 'Price: High to Low',
            sortRating: 'Highest Rated',
            sortDiscount: 'Biggest Discount',
            sortName: 'Name A-Z',
            showingResults: 'Showing',
            results: 'products',
            filters: 'Filter Products',
            noResultsTitle: 'No Results Found',
            noResultsDesc: 'Try changing your search or filter criteria',
            productDetails: 'Product Details',
            buyNow: 'Buy Now',
            cartTitle: 'Shopping Cart',
            cartEmpty: 'Cart is empty',
            cartTotal: 'Total',
            checkout: 'Checkout from Stores',
            clearCart: 'Clear Cart',
            addedToCart: 'Added to cart',
            removedFromCart: 'Removed from cart',
            cartCleared: 'Cart cleared',
            adminTitle: 'Product Control Panel',
            adminList: 'Product List',
            adminAdd: 'Add Product',
            adminExport: 'Export',
            formStore: 'Store',
            formCategory: 'Category',
            formName: 'Product Name',
            formPrice: 'Price (EGP)',
            formOldPrice: 'Old Price (EGP)',
            formImage: 'Image URL',
            formAffiliate: 'Affiliate Link',
            formRating: 'Rating (1-5)',
            formDiscount: 'Discount %',
            save: 'Save Product',
            cancel: 'Cancel',
            exportDesc: 'Export the new products.json file and upload it to GitHub to update the store permanently.',
            exportJson: 'Export products.json',
            importJson: 'Import from File',
            exportNote: 'Note:',
            exportNoteText: ' Changes are saved locally in your browser. To apply them to the site, download the JSON file and upload it to GitHub.',
            footerAbout: 'About',
            footerAboutText: 'Al-Shukairi Store - We provide the best products from the largest online stores in Egypt at the lowest prices and best deals.',
            footerLinks: 'Quick Links',
            footerCategories: 'Categories',
            footerBlog: 'Blog',
            footerBlogText: 'Follow Al-Shukairi Commercial Materials blog for the latest deals, discounts, and reviews.',
            footerAffiliate: 'Affiliate Links | Amazon: hassanshukair-21 | Noon: 502539',
            searchPlaceholder: 'Search for a product...',
            currency: 'EGP',
            savings: 'You save',
            feature1: 'Fast & reliable shipping',
            feature2: 'Guaranteed original quality',
            feature3: 'Excellent customer service',
            feature4: 'Easy 30-day returns',
            catElectronics: 'Electronics',
            catMobiles: 'Mobiles',
            catParts: 'Parts',
            catFashion: 'Fashion',
            catHome: 'Home',
            catBooks: 'Books',
            catBeauty: 'Beauty',
            catSports: 'Sports',
            catKids: 'Kids',
            catAll: 'All',
            productSaved: 'Product saved successfully',
            productDeleted: 'Product deleted',
            exportSuccess: 'File exported successfully',
            importSuccess: 'Products imported successfully',
            editProduct: 'Edit',
            deleteProduct: 'Delete'
        }
    };

    // ===== CATEGORY MAP =====
    const CATEGORIES = {
        electronics: { ar: 'إلكترونيات', en: 'Electronics', icon: '\uD83D\uDDA5' },
        mobiles: { ar: 'هواتف', en: 'Mobiles', icon: '\uD83D\uDCF1' },
        parts: { ar: 'قطع غيار', en: 'Parts', icon: '\uD83D\uDD27' },
        fashion: { ar: 'أزياء', en: 'Fashion', icon: '\uD83D\uDC57' },
        home: { ar: 'المنزل', en: 'Home', icon: '\uD83C\uDFE0' },
        books: { ar: 'كتب', en: 'Books', icon: '\uD83D\uDCDA' },
        beauty: { ar: 'جمال وعناية', en: 'Beauty', icon: '\u2728' },
        sports: { ar: 'رياضة', en: 'Sports', icon: '\u26BD' },
        kids: { ar: 'أطفال', en: 'Kids', icon: '\uD83D\uDC76' }
    };

    // ===== APP STATE =====
    const state = {
        allProducts: [],
        filteredProducts: [],
        cart: [],
        lang: localStorage.getItem(CONFIG.LANG_KEY) || 'ar',
        darkMode: localStorage.getItem(CONFIG.DARK_KEY) === 'true',
        filters: {
            store: 'all',
            category: 'all',
            maxPrice: 50000,
            minRating: 0,
            search: '',
            sort: 'default'
        },
        adminUnlocked: localStorage.getItem(CONFIG.ADMIN_KEY) === 'true',
        editingProductId: null,
        customProducts: JSON.parse(localStorage.getItem(CONFIG.CUSTOM_PRODUCTS_KEY) || '[]')
    };

    // ===== DOM ELEMENTS =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const DOM = {
        pageLoader: $('#pageLoader'),
        topBar: $('#topBar'),
        topBarClose: $('#topBarClose'),
        searchInput: $('#searchInput'),
        langToggle: $('#langToggle'),
        darkToggle: $('#darkToggle'),
        darkIcon: $('#darkIcon'),
        adminBtn: $('#adminBtn'),
        cartToggle: $('#cartToggle'),
        cartBadge: $('#cartBadge'),
        mobileMenuBtn: $('#mobileMenuBtn'),
        navInner: $('#navInner'),
        heroSection: $('#heroSection'),
        statProducts: $('#statProducts'),
        statDiscount: $('#statDiscount'),
        filterSidebar: $('#filterSidebar'),
        filterOverlay: $('#filterOverlay'),
        filterToggleMobile: $('#filterToggleMobile'),
        filterCloseMobile: $('#filterCloseMobile'),
        categoryList: $('#categoryList'),
        priceRange: $('#priceRange'),
        priceLabel: $('#priceLabel'),
        sortSelect: $('#sortSelect'),
        sortMobile: $('#sortMobile'),
        productGrid: $('#productGrid'),
        resultNum: $('#resultNum'),
        noResults: $('#noResults'),
        productModal: $('#productModal'),
        modalClose: $('#modalClose'),
        modalImage: $('#modalImage'),
        modalStoreTag: $('#modalStoreTag'),
        modalStoreName: $('#modalStoreName'),
        modalName: $('#modalName'),
        modalCategory: $('#modalCategory'),
        modalStars: $('#modalStars'),
        modalRateText: $('#modalRateText'),
        modalPrice: $('#modalPrice'),
        modalOldPrice: $('#modalOldPrice'),
        modalDiscount: $('#modalDiscount'),
        modalSavings: $('#modalSavings'),
        modalFeatures: $('#modalFeatures'),
        modalBuyBtn: $('#modalBuyBtn'),
        modalCartBtn: $('#modalCartBtn'),
        cartOverlay: $('#cartOverlay'),
        cartSidebar: $('#cartSidebar'),
        cartClose: $('#cartClose'),
        cartItems: $('#cartItems'),
        cartEmpty: $('#cartEmpty'),
        cartFooter: $('#cartFooter'),
        cartCountBadge: $('#cartCountBadge'),
        cartTotal: $('#cartTotal'),
        checkoutBtn: $('#checkoutBtn'),
        clearCartBtn: $('#clearCartBtn'),
        adminOverlay: $('#adminOverlay'),
        adminClose: $('#adminClose'),
        adminProductList: $('#adminProductList'),
        adminForm: $('#adminForm'),
        adminSaveBtn: $('#adminSaveBtn'),
        adminCancelBtn: $('#adminCancelBtn'),
        exportJsonBtn: $('#exportJsonBtn'),
        importJsonBtn: $('#importJsonBtn'),
        importFileInput: $('#importFileInput'),
        scrollTopBtn: $('#scrollTopBtn'),
        toastContainer: $('#toastContainer'),
        footerYear: $('#footerYear'),
        footerCategories: $('#footerCategories')
    };

    // ===== UTILITY FUNCTIONS =====
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatPrice(num) {
        return Number(num).toLocaleString('en-US');
    }

    function debounce(fn, ms) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), ms);
        };
    }

    function t(key) {
        return (i18n[state.lang] && i18n[state.lang][key]) || key;
    }

    function getCategoryName(catKey) {
        const cat = CATEGORIES[catKey];
        if (!cat) return catKey;
        return cat[state.lang] || catKey;
    }

    function getCategoryIcon(catKey) {
        const cat = CATEGORIES[catKey];
        return cat ? cat.icon : '\uD83D\uDCE6';
    }

    function generateId() {
        return 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    // ===== TOAST NOTIFICATIONS =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.textContent = message;
        DOM.toastContainer.appendChild(toast);
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 3000);
    }

    // ===== DARK MODE =====
    function initDarkMode() {
        if (state.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            DOM.darkIcon.textContent = '\u2600\uFE0F';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            DOM.darkIcon.textContent = '\uD83C\uDF19';
        }
    }

    function toggleDarkMode() {
        state.darkMode = !state.darkMode;
        localStorage.setItem(CONFIG.DARK_KEY, state.darkMode);
        initDarkMode();
    }

    // ===== LANGUAGE =====
    function initLanguage() {
        const html = document.documentElement;
        if (state.lang === 'en') {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            document.body.classList.add('en');
            DOM.langToggle.textContent = 'عربي';
            DOM.searchInput.placeholder = t('searchPlaceholder');
            DOM.searchInput.dir = 'ltr';
        } else {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            document.body.classList.remove('en');
            DOM.langToggle.textContent = 'EN';
            DOM.searchInput.placeholder = t('searchPlaceholder');
            DOM.searchInput.dir = 'rtl';
        }
        // Update all i18n elements
        $$('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation) {
                if (key === 'heroTitle') {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
        // Update price label
        const currency = t('currency');
        DOM.priceLabel.textContent = formatPrice(state.filters.maxPrice) + ' ' + currency;
        // Re-render dynamic content
        renderCategories();
        renderProducts();
        renderCart();
    }

    function toggleLanguage() {
        state.lang = state.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem(CONFIG.LANG_KEY, state.lang);
        initLanguage();
    }

    // ===== TOP BAR =====
    function initTopBar() {
        if (localStorage.getItem(CONFIG.TOPBAR_KEY) === 'hidden') {
            DOM.topBar.classList.add('hidden');
        }
    }

    // ===== ADMIN ACCESS =====
    function initAdmin() {
        if (state.adminUnlocked) {
            DOM.adminBtn.style.display = 'flex';
        }
        // Triple-click on logo to unlock admin
        let clickCount = 0;
        let clickTimer;
        const logo = document.querySelector('.header-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                clickCount++;
                clearTimeout(clickTimer);
                if (clickCount >= 5) {
                    clickCount = 0;
                    state.adminUnlocked = true;
                    localStorage.setItem(CONFIG.ADMIN_KEY, 'true');
                    DOM.adminBtn.style.display = 'flex';
                    showToast('Admin panel unlocked!', 'info');
                } else {
                    clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
                }
            });
        }
    }

    // ===== NAVIGATION CATEGORIES =====
    function renderNavCategories() {
        const existingCats = DOM.navInner.querySelectorAll('.nav-link');
        existingCats.forEach(el => el.remove());
        const divider = DOM.navInner.querySelector('.nav-divider');

        // Count products per category
        const counts = {};
        state.allProducts.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });

        // "All" link
        const allLink = document.createElement('button');
        allLink.className = 'nav-link active';
        allLink.setAttribute('data-nav-cat', 'all');
        allLink.innerHTML = (state.lang === 'ar' ? '\u0627\u0644\u0643\u0644' : 'All') +
            ' <span class="nav-count">' + state.allProducts.length + '</span>';
        allLink.addEventListener('click', () => {
            state.filters.category = 'all';
            updateActiveNav();
            applyFilters();
        });
        DOM.navInner.insertBefore(allLink, divider);

        // Category links
        Object.keys(CATEGORIES).forEach(catKey => {
            if (counts[catKey]) {
                const link = document.createElement('button');
                link.className = 'nav-link';
                link.setAttribute('data-nav-cat', catKey);
                link.innerHTML = getCategoryIcon(catKey) + ' ' + getCategoryName(catKey) +
                    ' <span class="nav-count">' + counts[catKey] + '</span>';
                link.addEventListener('click', () => {
                    state.filters.category = catKey;
                    updateActiveNav();
                    applyFilters();
                });
                DOM.navInner.insertBefore(link, divider);
            }
        });
    }

    function updateActiveNav() {
        $$('.nav-link').forEach(el => {
            const cat = el.getAttribute('data-nav-cat');
            el.classList.toggle('active', cat === state.filters.category);
        });
        $$('.cat-chip').forEach(el => {
            const cat = el.getAttribute('data-cat');
            el.classList.toggle('active', cat === state.filters.category);
        });
        $$('.nav-store').forEach(el => {
            const store = el.getAttribute('data-store');
            el.classList.toggle('active', store === state.filters.store);
        });
        $$('.store-chip').forEach(el => {
            const store = el.getAttribute('data-store');
            el.classList.toggle('active', store === state.filters.store);
        });
    }

    // ===== SIDEBAR CATEGORIES =====
    function renderCategories() {
        const counts = {};
        state.allProducts.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });

        let html = '<button class="cat-chip active" data-cat="all">' +
            getCategoryIcon('all') + ' ' + t('catAll') + ' (' + state.allProducts.length + ')</button>';

        Object.keys(CATEGORIES).forEach(catKey => {
            if (counts[catKey]) {
                html += '<button class="cat-chip" data-cat="' + catKey + '">' +
                    getCategoryIcon(catKey) + ' ' + getCategoryName(catKey) +
                    ' (' + counts[catKey] + ')</button>';
            }
        });

        DOM.categoryList.innerHTML = html;

        // Bind events
        $$('.cat-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                state.filters.category = chip.getAttribute('data-cat');
                updateActiveNav();
                applyFilters();
            });
        });

        // Footer categories
        let footerHtml = '';
        Object.keys(CATEGORIES).forEach(catKey => {
            if (counts[catKey]) {
                footerHtml += '<a href="#" onclick="return false;" data-footer-cat="' + catKey + '">' +
                    getCategoryName(catKey) + '</a><br>';
            }
        });
        if (DOM.footerCategories) {
            DOM.footerCategories.innerHTML = footerHtml;
            DOM.footerCategories.querySelectorAll('[data-footer-cat]').forEach(a => {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    state.filters.category = a.getAttribute('data-footer-cat');
                    updateActiveNav();
                    applyFilters();
                    window.scrollTo({ top: DOM.productArea.offsetTop - 150, behavior: 'smooth' });
                });
            });
        }
    }

    // ===== FILTER LOGIC =====
    function applyFilters() {
        let products = [...state.allProducts];

        // Store filter
        if (state.filters.store !== 'all') {
            products = products.filter(p => p.store === state.filters.store);
        }

        // Category filter
        if (state.filters.category !== 'all') {
            products = products.filter(p => p.category === state.filters.category);
        }

        // Price filter
        products = products.filter(p => Number(p.price) <= state.filters.maxPrice);

        // Rating filter
        if (state.filters.minRating > 0) {
            products = products.filter(p => Number(p.rating) >= state.filters.minRating);
        }

        // Search filter
        if (state.filters.search.trim()) {
            const query = state.filters.search.trim().toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                getCategoryName(p.category).toLowerCase().includes(query) ||
                p.store.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (state.filters.sort) {
            case 'price-asc':
                products.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'price-desc':
                products.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'rating-desc':
                products.sort((a, b) => Number(b.rating) - Number(a.rating));
                break;
            case 'discount-desc':
                products.sort((a, b) => Number(b.discount) - Number(a.discount));
                break;
            case 'name-asc':
                products.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
                break;
        }

        state.filteredProducts = products;
        renderProducts();
    }

    // ===== RENDER PRODUCTS =====
    function renderProducts() {
        const products = state.filteredProducts;
        DOM.resultNum.textContent = products.length;

        if (products.length === 0) {
            DOM.productGrid.innerHTML = '';
            DOM.noResults.style.display = 'block';
            return;
        }

        DOM.noResults.style.display = 'none';
        const currency = t('currency');

        let html = '';
        products.forEach((p, index) => {
            const storeClass = p.store === 'amazon' ? 'amazon' : 'noon';
            const storeName = p.store === 'amazon' ? 'Amazon' : 'Noon';
            const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
            const savings = p.oldPrice ? (Number(p.oldPrice) - Number(p.price)) : 0;

            html += '<div class="product-card fade-in" style="animation-delay:' + (index * 0.05) + 's" data-id="' + escapeHTML(p.id) + '">' +
                '<div class="card-img-wrap">' +
                    '<img src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.name) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
                    (p.discount ? '<span class="card-badge">-' + escapeHTML(p.discount) + '</span>' : '') +
                    '<span class="card-store-badge ' + storeClass + '">' + storeName + '</span>' +
                '</div>' +
                '<div class="card-body">' +
                    '<div class="card-category">' + getCategoryIcon(p.category) + ' ' + getCategoryName(p.category) + '</div>' +
                    '<h3 class="card-title">' + escapeHTML(p.name) + '</h3>' +
                    '<div class="card-rating">' +
                        '<span class="stars">' + stars + '</span>' +
                        '<span class="rate-num">' + p.rating + '</span>' +
                    '</div>' +
                    '<div class="card-pricing">' +
                        '<span class="card-price">' + formatPrice(p.price) + '</span>' +
                        (p.oldPrice ? '<span class="card-old-price">' + formatPrice(p.oldPrice) + '</span>' : '') +
                        '<span class="card-currency">' + currency + '</span>' +
                    '</div>' +
                    '<div class="card-actions">' +
                        '<button class="btn-cart" data-id="' + escapeHTML(p.id) + '">' +
                            '<span>\uD83D\uDED2</span> ' + t('buyNow') +
                        '</button>' +
                        '<button class="btn-details" data-id="' + escapeHTML(p.id) + '" title="' + t('productDetails') + '">' +
                            '<span>\u2139</span>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        });

        DOM.productGrid.innerHTML = html;

        // Bind card events
        $$('.btn-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(btn.getAttribute('data-id'));
            });
        });
        $$('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(btn.getAttribute('data-id'));
            });
        });
        $$('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                openModal(card.getAttribute('data-id'));
            });
        });
    }

    // ===== PRODUCT MODAL =====
    function openModal(productId) {
        const product = state.allProducts.find(p => p.id === productId);
        if (!product) return;

        const storeClass = product.store === 'amazon' ? 'amazon' : 'noon';
        const storeName = product.store === 'amazon' ? 'Amazon' : 'Noon';
        const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
        const currency = t('currency');
        const savings = product.oldPrice ? (Number(product.oldPrice) - Number(product.price)) : 0;

        DOM.modalImage.src = product.image;
        DOM.modalImage.alt = product.name;
        DOM.modalStoreTag.className = 'modal-store-tag ' + storeClass;
        DOM.modalStoreName.textContent = storeName;
        DOM.modalName.textContent = product.name;
        DOM.modalCategory.textContent = getCategoryIcon(product.category) + ' ' + getCategoryName(product.category);
        DOM.modalStars.textContent = stars;
        DOM.modalRateText.textContent = product.rating + '/5';
        DOM.modalPrice.textContent = formatPrice(product.price) + ' ' + currency;
        DOM.modalOldPrice.textContent = product.oldPrice ? formatPrice(product.oldPrice) + ' ' + currency : '';
        DOM.modalOldPrice.style.display = product.oldPrice ? 'inline' : 'none';
        DOM.modalDiscount.textContent = product.discount ? '-' + product.discount : '';
        DOM.modalDiscount.style.display = product.discount ? 'inline-block' : 'none';
        DOM.modalSavings.textContent = savings > 0 ? t('savings') + ': ' + formatPrice(savings) + ' ' + currency : '';
        DOM.modalSavings.style.display = savings > 0 ? 'block' : 'none';
        DOM.modalBuyBtn.href = product.affiliateLink;
        DOM.modalBuyBtn.className = 'btn-buy ' + (product.store === 'amazon' ? 'amazon-btn' : 'noon-btn');
        DOM.modalBuyBtn.querySelector('span').textContent = t('buyNow');

        // Features
        let features = [
            t('feature1'),
            t('feature2'),
            t('feature3'),
            t('feature4')
        ];
        DOM.modalFeatures.innerHTML = features.map(f => '<li>' + f + '</li>').join('');

        // Cart button
        DOM.modalCartBtn.onclick = () => addToCart(product.id);

        DOM.productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        DOM.productModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== CART =====
    function initCart() {
        try {
            state.cart = JSON.parse(localStorage.getItem(CONFIG.CART_KEY)) || [];
        } catch (e) {
            state.cart = [];
        }
        renderCart();
    }

    function saveCart() {
        localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(state.cart));
    }

    function addToCart(productId) {
        const product = state.allProducts.find(p => p.id === productId);
        if (!product) return;

        const existing = state.cart.find(item => item.id === productId);
        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            state.cart.push({ ...product, qty: 1 });
        }
        saveCart();
        renderCart();
        showToast(t('addedToCart'), 'success');
    }

    function removeFromCart(productId) {
        state.cart = state.cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
        showToast(t('removedFromCart'), 'info');
    }

    function clearCart() {
        state.cart = [];
        saveCart();
        renderCart();
        showToast(t('cartCleared'), 'info');
    }

    function renderCart() {
        const currency = t('currency');
        const count = state.cart.length;

        // Badge
        DOM.cartBadge.textContent = count;
        DOM.cartBadge.style.display = count > 0 ? 'flex' : 'none';
        DOM.cartCountBadge.textContent = count;

        if (count === 0) {
            DOM.cartItems.innerHTML = '<div class="cart-empty"><div class="empty-icon">\uD83D\uDED2</div><p>' + t('cartEmpty') + '</p></div>';
            DOM.cartFooter.style.display = 'none';
            return;
        }

        DOM.cartFooter.style.display = 'block';

        let total = 0;
        let html = '';
        state.cart.forEach(item => {
            const itemTotal = Number(item.price) * (item.qty || 1);
            total += itemTotal;
            const storeClass = item.store === 'amazon' ? 'amazon' : 'noon';
            const storeName = item.store === 'amazon' ? 'Amazon' : 'Noon';

            html += '<div class="cart-item">' +
                '<div class="cart-item-img"><img src="' + escapeHTML(item.image) + '" alt="" loading="lazy"></div>' +
                '<div class="cart-item-info">' +
                    '<div class="cart-item-name">' + escapeHTML(item.name) + '</div>' +
                    '<div class="cart-item-meta">' +
                        '<span class="cart-item-price">' + formatPrice(item.price) + ' ' + currency + '</span>' +
                        '<span class="cart-item-store ' + storeClass + '">' + storeName + '</span>' +
                    '</div>' +
                '</div>' +
                '<button class="cart-item-remove" data-id="' + escapeHTML(item.id) + '" aria-label="حذف">\u2715</button>' +
            '</div>';
        });

        DOM.cartItems.innerHTML = html;
        DOM.cartTotal.textContent = formatPrice(total) + ' ' + currency;

        // Bind remove buttons
        DOM.cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
        });
    }

    function openCart() {
        DOM.cartOverlay.classList.add('active');
        DOM.cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        DOM.cartOverlay.classList.remove('active');
        DOM.cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }

    function checkout() {
        if (state.cart.length === 0) return;
        // Open each product's affiliate link
        state.cart.forEach(item => {
            window.open(item.affiliateLink, '_blank');
        });
    }

    // ===== ADMIN PANEL =====
    function openAdmin() {
        renderAdminList();
        DOM.adminOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAdmin() {
        DOM.adminOverlay.classList.remove('active');
        document.body.style.overflow = '';
        state.editingProductId = null;
        DOM.adminForm.reset();
        $('#formEditId').value = '';
    }

    function switchAdminTab(tabName) {
        $$('.admin-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabName));
        $('#adminTabList').style.display = tabName === 'list' ? 'block' : 'none';
        $('#adminTabAdd').style.display = tabName === 'add' ? 'block' : 'none';
        $('#adminTabExport').style.display = tabName === 'export' ? 'block' : 'none';

        if (tabName === 'add' && !state.editingProductId) {
            DOM.adminForm.reset();
            $('#formEditId').value = '';
            DOM.adminSaveBtn.textContent = t('save');
        }
    }

    function renderAdminList() {
        const products = state.allProducts;
        let html = '';
        products.forEach(p => {
            const storeClass = p.store === 'amazon' ? 'amazon' : 'noon';
            const storeName = p.store === 'amazon' ? 'Amazon' : 'Noon';
            html += '<div class="admin-product-row">' +
                '<img src="' + escapeHTML(p.image) + '" alt="" loading="lazy">' +
                '<div class="apr-info">' +
                    '<div class="apr-name">' + escapeHTML(p.name) + '</div>' +
                    '<div class="apr-meta">' + storeName + ' | ' + getCategoryName(p.category) + ' | ' + formatPrice(p.price) + ' ' + t('currency') + '</div>' +
                '</div>' +
                '<div class="apr-actions">' +
                    '<button class="apr-btn edit" data-id="' + escapeHTML(p.id) + '" title="' + t('editProduct') + '">&#9998;</button>' +
                    (p.id.startsWith('custom_') ? '<button class="apr-btn delete" data-id="' + escapeHTML(p.id) + '" title="' + t('deleteProduct') + '">&#128465;</button>' : '') +
                '</div>' +
            '</div>';
        });
        DOM.adminProductList.innerHTML = html;

        // Bind events
        DOM.adminProductList.querySelectorAll('.apr-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.getAttribute('data-id')));
        });
        DOM.adminProductList.querySelectorAll('.apr-btn.delete').forEach(btn => {
            btn.addEventListener('click', () => deleteProduct(btn.getAttribute('data-id')));
        });
    }

    function editProduct(productId) {
        const product = state.allProducts.find(p => p.id === productId);
        if (!product) return;

        state.editingProductId = productId;
        switchAdminTab('add');

        $('#formStore').value = product.store;
        $('#formCategory').value = product.category;
        $('#formName').value = product.name;
        $('#formPrice').value = product.price;
        $('#formOldPrice').value = product.oldPrice || '';
        $('#formImage').value = product.image;
        $('#formAffiliate').value = product.affiliateLink;
        $('#formRating').value = product.rating;
        $('#formDiscount').value = product.discount || '';
        $('#formEditId').value = productId;
        DOM.adminSaveBtn.textContent = state.lang === 'ar' ? 'تحديث المنتج' : 'Update Product';
    }

    function deleteProduct(productId) {
        state.customProducts = state.customProducts.filter(p => p.id !== productId);
        localStorage.setItem(CONFIG.CUSTOM_PRODUCTS_KEY, JSON.stringify(state.customProducts));
        loadAllProducts();
        renderAdminList();
        showToast(t('productDeleted'), 'info');
    }

    function saveProduct(e) {
        e.preventDefault();

        const productData = {
            store: $('#formStore').value,
            category: $('#formCategory').value,
            name: $('#formName').value.trim(),
            price: $('#formPrice').value,
            oldPrice: $('#formOldPrice').value || '',
            image: $('#formImage').value.trim(),
            affiliateLink: $('#formAffiliate').value.trim(),
            rating: parseFloat($('#formRating').value) || 4.5,
            discount: $('#formDiscount').value || '0'
        };

        if (state.editingProductId) {
            // Update existing custom product
            const idx = state.customProducts.findIndex(p => p.id === state.editingProductId);
            if (idx !== -1) {
                state.customProducts[idx] = { ...state.customProducts[idx], ...productData };
            }
        } else {
            // Add new custom product
            productData.id = generateId();
            state.customProducts.push(productData);
        }

        localStorage.setItem(CONFIG.CUSTOM_PRODUCTS_KEY, JSON.stringify(state.customProducts));
        loadAllProducts();
        state.editingProductId = null;
        DOM.adminForm.reset();
        $('#formEditId').value = '';
        switchAdminTab('list');
        showToast(t('productSaved'), 'success');
    }

    function exportJSON() {
        const amazonProducts = state.allProducts.filter(p => p.store === 'amazon').map(({ id, store, ...rest }) => ({
            id: id.startsWith('custom_') ? id : id,
            ...rest
        }));
        const noonProducts = state.allProducts.filter(p => p.store === 'noon').map(({ id, store, ...rest }) => ({
            id: id.startsWith('custom_') ? id : id,
            ...rest
        }));

        const json = {
            lastUpdate: new Date().toISOString().split('T')[0],
            amazon: amazonProducts,
            noon: noonProducts
        };

        const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(t('exportSuccess'), 'success');
    }

    function importJSON() {
        DOM.importFileInput.click();
    }

    function handleImportFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(ev) {
            try {
                const data = JSON.parse(ev.target.result);
                if (data.amazon && data.noon) {
                    // Store as custom products (override)
                    const allCustom = [];
                    data.amazon.forEach(p => allCustom.push({ ...p, store: 'amazon', id: p.id || generateId() }));
                    data.noon.forEach(p => allCustom.push({ ...p, store: 'noon', id: p.id || generateId() }));
                    state.customProducts = allCustom;
                    localStorage.setItem(CONFIG.CUSTOM_PRODUCTS_KEY, JSON.stringify(allCustom));
                    loadAllProducts();
                    renderAdminList();
                    showToast(t('importSuccess'), 'success');
                } else {
                    showToast('Invalid JSON format', 'error');
                }
            } catch (err) {
                showToast('Error reading file', 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    // ===== FETCH PRODUCTS =====
    function mergeProducts(remoteData) {
        let amazon = [];
        let noon = [];

        if (remoteData && remoteData.amazon) {
            amazon = remoteData.amazon.map(p => ({ ...p, store: 'amazon' }));
        }
        if (remoteData && remoteData.noon) {
            noon = remoteData.noon.map(p => ({ ...p, store: 'noon' }));
        }

        // Merge with custom products (custom override remote by id)
        const all = [...amazon, ...noon];
        state.customProducts.forEach(cp => {
            const idx = all.findIndex(p => p.id === cp.id);
            if (idx !== -1) {
                all[idx] = { ...all[idx], ...cp };
            } else {
                all.push(cp);
            }
        });

        state.allProducts = all;
    }

    async function fetchProducts() {
        try {
            const response = await fetch(CONFIG.DATA_URL + '?t=' + Date.now());
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            mergeProducts(data);
        } catch (err) {
            console.warn('Using local/custom products only:', err);
            // Try to use cached products from localStorage
            const cached = localStorage.getItem('mushaf_cached_products');
            if (cached) {
                try {
                    mergeProducts(JSON.parse(cached));
                } catch (e) {
                    mergeProducts(null);
                }
            } else {
                mergeProducts(null);
            }
        }

        // Cache the remote data
        if (state.allProducts.length > 0) {
            const amazon = state.allProducts.filter(p => p.store === 'amazon').map(({ store, ...rest }) => rest);
            const noon = state.allProducts.filter(p => p.store === 'noon').map(({ store, ...rest }) => rest);
            localStorage.setItem('mushaf_cached_products', JSON.stringify({ amazon, noon }));
        }

        // Update hero stats
        updateStats();
        renderNavCategories();
        renderCategories();
        applyFilters();

        // Hide loader
        setTimeout(() => {
            DOM.pageLoader.classList.add('hidden');
        }, 500);
    }

    function loadAllProducts() {
        // Reload products (will use cached if fetch fails)
        const cached = localStorage.getItem('mushaf_cached_products');
        let remoteData = null;
        if (cached) {
            try { remoteData = JSON.parse(cached); } catch (e) {}
        }
        mergeProducts(remoteData);
        updateStats();
        renderNavCategories();
        renderCategories();
        applyFilters();
    }

    function updateStats() {
        DOM.statProducts.textContent = state.allProducts.length;
        const maxDiscount = state.allProducts.reduce((max, p) => {
            return Math.max(max, parseInt(p.discount) || 0);
        }, 0);
        DOM.statDiscount.textContent = maxDiscount + '%';
    }

    // ===== MOBILE FILTER =====
    function openMobileFilter() {
        DOM.filterSidebar.classList.add('mobile-open');
        DOM.filterOverlay.classList.add('active');
        DOM.filterOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeMobileFilter() {
        DOM.filterSidebar.classList.remove('mobile-open');
        DOM.filterOverlay.classList.remove('active');
        setTimeout(() => { DOM.filterOverlay.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
    }

    // ===== SCROLL TO TOP =====
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        DOM.scrollTopBtn.classList.toggle('visible', scrollTop > 400);
    }

    // ===== EVENT BINDINGS =====
    function bindEvents() {
        // Top bar close
        DOM.topBarClose.addEventListener('click', () => {
            DOM.topBar.classList.add('hidden');
            localStorage.setItem(CONFIG.TOPBAR_KEY, 'hidden');
        });

        // Search
        DOM.searchInput.addEventListener('input', debounce(function() {
            state.filters.search = this.value;
            applyFilters();
        }, CONFIG.DEBOUNCE_MS));

        // Language toggle
        DOM.langToggle.addEventListener('click', toggleLanguage);

        // Dark mode toggle
        DOM.darkToggle.addEventListener('click', toggleDarkMode);

        // Cart
        DOM.cartToggle.addEventListener('click', openCart);
        DOM.cartClose.addEventListener('click', closeCart);
        DOM.cartOverlay.addEventListener('click', closeCart);
        DOM.clearCartBtn.addEventListener('click', clearCart);
        DOM.checkoutBtn.addEventListener('click', checkout);

        // Modal
        DOM.modalClose.addEventListener('click', closeModal);
        DOM.productModal.addEventListener('click', (e) => {
            if (e.target === DOM.productModal) closeModal();
        });

        // Admin
        DOM.adminBtn.addEventListener('click', openAdmin);
        DOM.adminClose.addEventListener('click', closeAdmin);
        DOM.adminOverlay.addEventListener('click', (e) => {
            if (e.target === DOM.adminOverlay) closeAdmin();
        });
        $$('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => switchAdminTab(tab.getAttribute('data-tab')));
        });
        DOM.adminForm.addEventListener('submit', saveProduct);
        DOM.adminCancelBtn.addEventListener('click', () => {
            state.editingProductId = null;
            DOM.adminForm.reset();
            $('#formEditId').value = '';
            switchAdminTab('list');
        });
        DOM.exportJsonBtn.addEventListener('click', exportJSON);
        DOM.importJsonBtn.addEventListener('click', importJSON);
        DOM.importFileInput.addEventListener('change', handleImportFile);

        // Store filters (nav)
        $$('.nav-store').forEach(btn => {
            btn.addEventListener('click', () => {
                const store = btn.getAttribute('data-store');
                state.filters.store = state.filters.store === store ? 'all' : store;
                updateActiveNav();
                applyFilters();
            });
        });

        // Store filters (sidebar)
        $$('.store-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const store = chip.getAttribute('data-store');
                state.filters.store = state.filters.store === store ? 'all' : store;
                updateActiveNav();
                applyFilters();
            });
        });

        // Price range
        DOM.priceRange.addEventListener('input', function() {
            state.filters.maxPrice = Number(this.value);
            const currency = t('currency');
            DOM.priceLabel.textContent = formatPrice(this.value) + ' ' + currency;
            applyFilters();
        });

        // Update price range max
        const maxProductPrice = Math.max(...state.allProducts.map(p => Number(p.price)), 50000);
        DOM.priceRange.max = Math.ceil(maxProductPrice / 1000) * 1000;
        DOM.priceRange.value = DOM.priceRange.max;
        state.filters.maxPrice = Number(DOM.priceRange.max);
        DOM.priceLabel.textContent = formatPrice(DOM.priceRange.max) + ' ' + t('currency');

        // Rating filter
        $$('.rating-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const rating = Number(opt.getAttribute('data-rating'));
                state.filters.minRating = state.filters.minRating === rating && rating > 0 ? 0 : rating;
                $$('.rating-option').forEach(o => o.classList.remove('active'));
                if (state.filters.minRating > 0) opt.classList.add('active');
                else $$('.rating-option[data-rating="0"]').forEach(o => o.classList.add('active'));
                applyFilters();
            });
        });

        // Clear filters
        $('#clearCategory')?.addEventListener('click', () => {
            state.filters.category = 'all';
            updateActiveNav();
            applyFilters();
        });
        $('#clearRating')?.addEventListener('click', () => {
            state.filters.minRating = 0;
            $$('.rating-option').forEach(o => o.classList.remove('active'));
            $$('.rating-option[data-rating="0"]').forEach(o => o.classList.add('active'));
            applyFilters();
        });

        // Sort
        DOM.sortSelect.addEventListener('change', function() {
            state.filters.sort = this.value;
            DOM.sortMobile.value = this.value;
            applyFilters();
        });
        DOM.sortMobile.addEventListener('change', function() {
            state.filters.sort = this.value;
            DOM.sortSelect.value = this.value;
            applyFilters();
        });

        // Mobile filter
        DOM.filterToggleMobile.addEventListener('click', openMobileFilter);
        DOM.filterCloseMobile.addEventListener('click', closeMobileFilter);
        DOM.filterOverlay.addEventListener('click', closeMobileFilter);

        // Scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        DOM.scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeCart();
                closeAdmin();
                closeMobileFilter();
            }
        });

        // Footer year
        DOM.footerYear.textContent = new Date().getFullYear();

        // Checkout opens all affiliate links
        DOM.checkoutBtn.addEventListener('click', checkout);
    }

    // ===== SERVICE WORKER REGISTRATION =====
    function registerSW() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(reg => console.log('SW registered:', reg.scope))
                    .catch(err => console.log('SW registration failed:', err));
            });
        }
    }

    // ===== INITIALIZE =====
    function init() {
        initDarkMode();
        initTopBar();
        initLanguage();
        initCart();
        initAdmin();
        bindEvents();
        fetchProducts();
        registerSW();
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();