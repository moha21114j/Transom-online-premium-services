// Track current state to avoid unnecessary updates
let currentCurrencyPosition = 'top';

window.addEventListener('scroll', () => {
    const header = document.querySelector('header'); // NEW: Get header element
    const topBar = document.querySelector('.top-bar');
    const mainNav = document.querySelector('.main-nav');
    const currencyTop = document.getElementById('currency-selector-top');
    const currencyNav = document.getElementById('currency-selector-nav');
    const scrollY = window.scrollY;

    if (!topBar || !mainNav || !header) return; // NEW: Check header exists

    const fadeStart = 0;
    const fadeEnd = 200;

    let opacity = 1;
    if (scrollY > fadeStart) {
        opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        if (opacity < 0) opacity = 0;
    }

    topBar.style.opacity = opacity;

    if (opacity === 0) {
        mainNav.style.marginTop = '-40px';
        header.classList.add('scrolled'); // NEW: Add scrolled class for centered layout
        
        // Only update if position changed to avoid lag
        if (currentCurrencyPosition === 'top' && currencyTop && currencyNav) {
            currentCurrencyPosition = 'nav';
            currencyTop.style.display = 'none';
            currencyNav.style.display = 'block';
            // Immediate show without setTimeout to reduce lag
            currencyNav.classList.add('show');
        }
    } else {
        mainNav.style.marginTop = '0';
        header.classList.remove('scrolled'); // NEW: Remove scrolled class for normal layout
        
        // Only update if position changed to avoid lag
        if (currentCurrencyPosition === 'nav' && currencyTop && currencyNav) {
            currentCurrencyPosition = 'top';
            currencyNav.classList.remove('show');
            // Reduce timeout to minimize lag
            setTimeout(() => {
                if (currentCurrencyPosition === 'top') { // Double check state hasn't changed
                    currencyNav.style.display = 'none';
                    currencyTop.style.display = 'block';
                }
            }, 150);
        }
    }
});

window.toggleCurrencyDropdown = function() {
    // Get current active currency selector based on position state
    let dropdown;
    
    if (currentCurrencyPosition === 'top') {
        dropdown = document.getElementById('currency-dropdown');
    } else {
        dropdown = document.getElementById('currency-dropdown-nav');
    }
    
    if (dropdown) {
        // Instant toggle without delay
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
};

window.setCurrency = function(currency) {
    const selectedCurrencyTop = document.getElementById('selected-currency');
    const selectedCurrencyNav = document.getElementById('selected-currency-nav');
    const dropdownTop = document.getElementById('currency-dropdown');
    const dropdownNav = document.getElementById('currency-dropdown-nav');

    // Update both currency displays
    if (selectedCurrencyTop) {
        selectedCurrencyTop.textContent = currency;
    }
    if (selectedCurrencyNav) {
        selectedCurrencyNav.textContent = currency;
    }
    
    // Hide both dropdowns
    if (dropdownTop) {
        dropdownTop.style.display = 'none';
    }
    if (dropdownNav) {
        dropdownNav.style.display = 'none';
    }

    localStorage.setItem('selectedCurrency', currency);
};

window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
};

// Close currency dropdown when clicking outside - optimized
document.addEventListener('click', function(event) {
    const currencyTop = document.querySelector('#currency-selector-top');
    const currencyNav = document.querySelector('#currency-selector-nav');
    const dropdownTop = document.getElementById('currency-dropdown');
    const dropdownNav = document.getElementById('currency-dropdown-nav');
    
    // Only check the currently active currency selector to reduce processing
    if (currentCurrencyPosition === 'top') {
        if (currencyTop && !currencyTop.contains(event.target) && dropdownTop) {
            dropdownTop.style.display = 'none';
        }
    } else {
        if (currencyNav && !currencyNav.contains(event.target) && dropdownNav) {
            dropdownNav.style.display = 'none';
        }
    }
});

// Load saved currency on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
        setCurrency(savedCurrency);
    }
});