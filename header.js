// Debug version - let's check if elements exist first
console.log('Header.js loaded');

// Main scroll effect for top bar fade and nav slide
window.addEventListener('scroll', () => {
    console.log('Scroll event triggered');
    
    const topBar = document.querySelector('.top-bar');
    const mainNav = document.querySelector('.main-nav');
    const scrollY = window.scrollY;

    console.log('Top bar:', topBar);
    console.log('Main nav:', mainNav);
    console.log('Scroll Y:', scrollY);

    if (!topBar || !mainNav) {
        console.log('Elements not found!');
        return;
    }

    const fadeStart = 0;
    const fadeEnd = 200;

    // Fade the top-bar
    let opacity = 1;
    if (scrollY > fadeStart) {
        opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        if (opacity < 0) opacity = 0;
    }
    
    console.log('Setting opacity to:', opacity);
    topBar.style.opacity = opacity;

    // Slide the nav up when top-bar is gone
    if (opacity === 0) {
        console.log('Sliding nav up');
        mainNav.style.marginTop = '-40px';
    } else {
        console.log('Resetting nav position');
        mainNav.style.marginTop = '0';
    }
});

function selectService(service) {
    const serviceDescription = document.getElementById('service-description');
    if (!serviceDescription) return;
    
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    const descriptions = {
        'meet-greet': 'Meet & Greet: Choose from a range of Meet & Greet services to make your airport experience simpler, quicker and less stressful.',
        'lounges': 'Airport Lounges: Relax in our world-class lounges with premium amenities, regardless of your airline or class of travel.',
        'elite': 'Elite Services: Experience VIP treatment with chauffeur-driven cars and exclusive access to premium facilities.'
    };
    serviceDescription.textContent = descriptions[service];
}

// Passenger counter
let counts = {
    adults: 1,
    children: 0,
    infants: 0
};

function changeCount(type, change) {
    counts[type] += change;
    if (counts[type] < 0) counts[type] = 0;
    if (type === 'adults' && counts[type] < 1) counts[type] = 1;
    
    const countElement = document.getElementById(type + '-count');
    if (countElement) {
        countElement.textContent = counts[type];
    }
    
    const minusBtn = event.target.parentElement.querySelector('.counter-btn:first-child');
    if (minusBtn) {
        minusBtn.disabled = (counts[type] === 0) || (type === 'adults' && counts[type] === 1);
    }
}

// Search function
function searchServices() {
    const serviceTypeElement = document.querySelector('input[name="service-type"]:checked');
    const departureAirportElement = document.getElementById('departure-airport');
    const arrivalDateElement = document.getElementById('arrival-date');
    const flightNumberElement = document.getElementById('flight-number');
    
    if (!serviceTypeElement || !arrivalDateElement) {
        console.log('Required form elements not found');
        return;
    }
    
    const serviceType = serviceTypeElement.value;
    const departureAirport = departureAirportElement ? departureAirportElement.value : '';
    const arrivalDate = arrivalDateElement.value;
    const flightNumber = flightNumberElement ? flightNumberElement.value : '';
    
    if (!arrivalDate) {
        alert('Please select an arrival date');
        return;
    }
    alert(`Searching for ${serviceType} services for ${counts.adults} adults, ${counts.children} children, and ${counts.infants} infants on ${arrivalDate}`);
}

// Hero navigation dots (only if they exist)
function initHeroNavDots() {
    const heroNavDots = document.querySelectorAll('.hero-nav span');
    if (heroNavDots.length > 0) {
        heroNavDots.forEach((dot) => {
            dot.addEventListener('click', () => {
                heroNavDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        // Auto-rotate hero nav dots
        let currentSlide = 0;
        setInterval(() => {
            heroNavDots.forEach(d => d.classList.remove('active'));
            currentSlide = (currentSlide + 1) % heroNavDots.length;
            heroNavDots[currentSlide].classList.add('active');
        }, 4000);
    }
}

// Initialize hero slider (only if it exists)
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length === 0) return;
    
    let currentIndex = 0;

    window.showSlide = function(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    window.nextSlide = function() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    window.prevSlide = function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Auto-advance slides
    setInterval(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }, 5000);
}

// Set default date to today (only if element exists)
function setDefaultDate() {
    const arrivalDateElement = document.getElementById('arrival-date');
    if (arrivalDateElement) {
        arrivalDateElement.valueAsDate = new Date();
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Currency selector
function toggleCurrency() {
    alert('Currency selector opened - implement currency options');
}

function toggleCurrencyDropdown() {
    const dropdown = document.getElementById('currency-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

function setCurrency(currency) {
    const selectedCurrencyElement = document.getElementById('selected-currency');
    const dropdown = document.getElementById('currency-dropdown');
    
    if (selectedCurrencyElement) {
        selectedCurrencyElement.textContent = currency;
    }
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    // Optional: You can store the choice in localStorage
    localStorage.setItem('selectedCurrency', currency);
}

// Search button
function toggleSearch() {
    alert('Search functionality - implement search overlay');
}

// Cart button
function toggleCart() {
    alert('Shopping cart opened - implement cart functionality');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Load stored currency
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const selectedCurrencyElement = document.getElementById('selected-currency');
    if (savedCurrency && selectedCurrencyElement) {
        selectedCurrencyElement.textContent = savedCurrency;
    }
    
    // Initialize components
    initHeroNavDots();
    initHeroSlider();
    setDefaultDate();
    
    // Currency dropdown click outside handler
    document.addEventListener('click', (e) => {
        const selector = document.querySelector('.currency-selector');
        const dropdown = document.getElementById('currency-dropdown');
        if (selector && dropdown && !selector.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Mobile menu click outside handler
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenuBtn && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Service booking handlers
    document.querySelectorAll('.book-now-small').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = e.target.textContent.includes('Limo') ? 'Limo Service' : 'Valet Service';
            alert(`Booking ${serviceType}... This would redirect to the booking page.`);
        });
    });
});