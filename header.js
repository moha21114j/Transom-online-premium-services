
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const mainNav = document.querySelector('.main-nav');
    const scrollY = window.scrollY;

    const fadeStart = 50;
    const fadeEnd = 200;

    // Fade the top-bar
    let opacity = 1;
    if (scrollY > fadeStart) {
        opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        if (opacity < 0) opacity = 0;
    }
    topBar.style.opacity = opacity;

    // Slide the nav up when top-bar is gone
    if (opacity === 0) {
        mainNav.style.marginTop = '-40px';  // adjust as needed
    } else {
        mainNav.style.marginTop = '0';
    }
});

function selectService(service) {
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    const descriptions = {
        'meet-greet': 'Meet & Greet: Choose from a range of Meet & Greet services to make your airport experience simpler, quicker and less stressful.',
        'lounges': 'Airport Lounges: Relax in our world-class lounges with premium amenities, regardless of your airline or class of travel.',
        'elite': 'Elite Services: Experience VIP treatment with chauffeur-driven cars and exclusive access to premium facilities.'
    };
    document.getElementById('service-description').textContent = descriptions[service];
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
    document.getElementById(type + '-count').textContent = counts[type];
    const minusBtn = event.target.parentElement.querySelector('.counter-btn:first-child');
    minusBtn.disabled = (counts[type] === 0) || (type === 'adults' && counts[type] === 1);
}

// Search function
function searchServices() {
    const serviceType = document.querySelector('input[name="service-type"]:checked').value;
    const departureAirport = document.getElementById('departure-airport').value;
    const arrivalDate = document.getElementById('arrival-date').value;
    const flightNumber = document.getElementById('flight-number').value;
    if (!arrivalDate) {
        alert('Please select an arrival date');
        return;
    }
    alert(`Searching for ${serviceType} services for ${counts.adults} adults, ${counts.children} children, and ${counts.infants} infants on ${arrivalDate}`);
}

// Hero navigation dots
document.querySelectorAll('.hero-nav span').forEach((dot) => {
    dot.addEventListener('click', () => {
        document.querySelectorAll('.hero-nav span').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
    });
});

// Auto-rotate hero nav dots
let currentSlide = 0;
setInterval(() => {
    document.querySelectorAll('.hero-nav span').forEach(d => d.classList.remove('active'));
    currentSlide = (currentSlide + 1) % 6;
    document.querySelectorAll('.hero-nav span')[currentSlide].classList.add('active');
}, 4000);

// Set default date to today
document.getElementById('arrival-date').valueAsDate = new Date();

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Currency selector
function toggleCurrency() {
    alert('Currency selector opened - implement currency options');
}


function toggleCurrencyDropdown() {
    const dropdown = document.getElementById('currency-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    function setCurrency(currency) {
    document.getElementById('selected-currency').textContent = currency;
    document.getElementById('currency-dropdown').style.display = 'none';
    
    // Optional: You can store the choice in localStorage
    localStorage.setItem('selectedCurrency', currency);
    }

    // Load stored currency on page load
    document.addEventListener('DOMContentLoaded', () => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
        document.getElementById('selected-currency').textContent = savedCurrency;
    }
    });

      
document.addEventListener('click', (e) => {
    const selector = document.querySelector('.currency-selector');
    if (!selector.contains(e.target)) {
        document.getElementById('currency-dropdown').style.display = 'none';
    }
    });

// Search button
function toggleSearch() {
    alert('Search functionality - implement search overlay');
}

// Cart button
function toggleCart() {
    alert('Shopping cart opened - implement cart functionality');
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (scrollTop > 50) {
        header.classList.add('scrolled');
        dropdowns.forEach(dropdown => {
            dropdown.style.top = header.offsetHeight + 'px';
        });
    } else {
        header.classList.remove('scrolled');
        dropdowns.forEach(dropdown => {
            dropdown.style.top = header.offsetHeight + 'px';
        });
    }
});

// Set dropdown position on load, enable hover behavior
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const dropdowns = document.querySelectorAll('.dropdown');
    const overlay = document.querySelector('.dropdown-overlay');
    const navItems = document.querySelectorAll('.nav-item');

    // Set initial top
    dropdowns.forEach(dropdown => {
        dropdown.style.top = header.offsetHeight + 'px';
    });

    // Hover open/close
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';

            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }
        });

        item.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';

            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        });
    });

    // Overlay click closes all
    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        dropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(-10px)';
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});
const slides = document.querySelectorAll('.hero-slider .slide');
let currentIndex = 0;

setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
}, 5000);

function showSlide(index) {
slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
});
}

function nextSlide() {
currentIndex = (currentIndex + 1) % slides.length;
showSlide(currentIndex);
}

function prevSlide() {
currentIndex = (currentIndex - 1 + slides.length) % slides.length;
showSlide(currentIndex);
}

// Handle service bookings
document.addEventListener('DOMContentLoaded', function() {
document.querySelectorAll('.book-now-small').forEach(button => {
button.addEventListener('click', function(e) {
    e.preventDefault();
    const serviceType = e.target.textContent.includes('Limo') ? 'Limo Service' : 'Valet Service';
    alert(`Booking ${serviceType}... This would redirect to the booking page.`);
});
});
});


