
// Debug version - let's check if elements exist first
console.log('Header.js loaded');

window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const mainNav = document.querySelector('.main-nav');
    const scrollY = window.scrollY;

    if (!topBar || !mainNav) return;

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
    } else {
        mainNav.style.marginTop = '0';
    }
});


window.toggleCurrencyDropdown = function() {
    const dropdown = document.getElementById('currency-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
};

window.setCurrency = function(currency) {
    const selectedCurrencyElement = document.getElementById('selected-currency');
    const dropdown = document.getElementById('currency-dropdown');

    if (selectedCurrencyElement) {
        selectedCurrencyElement.textContent = currency;
    }
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    localStorage.setItem('selectedCurrency', currency);
};


window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
};



