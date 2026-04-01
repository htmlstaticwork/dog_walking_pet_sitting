// Main JavaScript for Dog Walking & Pet Sitting Co-op

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        themeBtn.innerHTML = theme === 'light' ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
        if (window.lucide) window.lucide.createIcons();
    }

    // 2. RTL Toggle
    const rtlBtn = document.getElementById('rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    
    document.documentElement.setAttribute('dir', currentDir);
    updateRtlIcon(currentDir);

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const newDir = document.documentElement.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRtlIcon(newDir);
        });
    }

    function updateRtlIcon(dir) {
        if (!rtlBtn) return;
        rtlBtn.innerHTML = dir === 'ltr' ? '<span style="font-size: 0.8rem; font-weight: bold;">RTL</span>' : '<span style="font-size: 0.8rem; font-weight: bold;">LTR</span>';
    }

    // 3. Mobile Menu & Responsive Actions
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerActions = document.querySelector('.header-actions');
    
    // Inject desktop buttons into mobile menu
    if (navLinks && headerActions) {
        const signupBtn = headerActions.querySelector('.btn-secondary');
        const themeBtnOrig = headerActions.querySelector('#theme-toggle');
        const rtlBtnOrig = headerActions.querySelector('#rtl-toggle');
        
        if (signupBtn) {
            signupBtn.classList.add('desktop-only');
            if(themeBtnOrig) themeBtnOrig.classList.add('desktop-only');
            if(rtlBtnOrig) rtlBtnOrig.classList.add('desktop-only');
            
            const mobileActions = document.createElement('div');
            mobileActions.className = 'mobile-only-actions';
            mobileActions.style.display = 'flex';
            mobileActions.style.flexDirection = 'column';
            mobileActions.style.gap = '1rem';
            mobileActions.style.marginTop = '1.5rem';
            mobileActions.style.paddingTop = '1.5rem';
            mobileActions.style.borderTop = '1px solid var(--border)';
            mobileActions.style.width = '100%';
            
            // Toggle container (horizontal)
            const toggleContainer = document.createElement('div');
            toggleContainer.style.display = 'flex';
            toggleContainer.style.gap = '1rem';
            toggleContainer.style.marginBottom = '1rem';
            
            if (rtlBtnOrig) {
                const rtlClone = rtlBtnOrig.cloneNode(true);
                rtlClone.id = 'rtl-toggle-mobile';
                rtlClone.classList.remove('desktop-only');
                rtlClone.addEventListener('click', () => rtlBtnOrig.click());
                toggleContainer.appendChild(rtlClone);
            }
            if (themeBtnOrig) {
                const themeClone = themeBtnOrig.cloneNode(true);
                themeClone.id = 'theme-toggle-mobile';
                themeClone.classList.remove('desktop-only');
                themeClone.addEventListener('click', () => themeBtnOrig.click());
                toggleContainer.appendChild(themeClone);
            }
            mobileActions.appendChild(toggleContainer);
            
            const signClone = signupBtn.cloneNode(true);
            signClone.classList.remove('desktop-only');
            signClone.classList.add('btn-primary'); // Make it stand out in mobile menu
            signClone.classList.remove('btn-secondary');
            signClone.style.textAlign = 'center';
            signClone.style.width = '100%';
            signClone.style.alignSelf = 'stretch';
            
            mobileActions.appendChild(signClone);
            navLinks.appendChild(mobileActions);
        }
    }
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            if (window.lucide) window.lucide.createIcons();
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) window.lucide.createIcons();
            });
        });
    }

    // 4. Sticky Header Shadow
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 20) {
            header.style.boxShadow = 'var(--shadow-lg)';
            header.style.backgroundColor = 'var(--header-bg)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 5. Active Link Highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 6. Scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-top';
    scrollBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
    scrollBtn.className = 'toggle-btn';
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '2rem';
    scrollBtn.style.right = '2rem';
    scrollBtn.style.display = 'none';
    scrollBtn.style.zIndex = '999';
    scrollBtn.style.backgroundColor = 'var(--primary)';
    scrollBtn.style.color = 'white';
    scrollBtn.style.border = 'none';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize Lucide Icons
    if (window.lucide) window.lucide.createIcons();
});

// CSS for Mobile Menu and Scroll-to-top integration
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 1200px) {
        .nav-links.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            height: auto;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
            background: var(--bg-main);
            padding: 2.5rem;
            border-bottom: 1px solid var(--border);
            z-index: 998;
            box-shadow: var(--shadow-lg);
            animation: fadeIn 0.3s ease;
            gap: 1.5rem;
        }


        .nav-links.active a {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-main);
        }
        .menu-label {
            font-size: 0.75rem;
            letter-spacing: 2px;
            opacity: 0.5;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }
    }
    #scroll-top:hover {
        transform: translateY(-5px);
        background-color: var(--primary-hover);
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style);
