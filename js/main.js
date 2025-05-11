// left right arrow for about us (our core values section)
document.addEventListener('DOMContentLoaded', function () {
    try {
        const slider = document.getElementById('valuesSlider');
        if (!slider) throw new Error('Slider not found');

        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const cardWidth = 280;

        nextButton.addEventListener('click', () => {
            slider.scrollBy({ left: cardWidth * 1, behavior: 'smooth' });
        });

        prevButton.addEventListener('click', () => {
            slider.scrollBy({ left: -cardWidth * 1, behavior: 'smooth' });
        });

        console.log("✅ Slider event listeners initialized.");
    } catch (e) {
        console.error("🚨 Error in main.js:", e);
    }
});

//Contact Us Page Form Submission
function contactFormSubmission() {
    emailjs.init('_1EIg4F8iO2L2gQSq'); // replace with your EmailJS public key


    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault(); // prevent page reload

        emailjs.sendForm('service_7zelifg', 'template_g24cqxn', this)
            .then(() => {
                alert('Message sent successfully!');
                this.reset();
            }, (error) => {
                console.error('FAILED...', error);
                alert('Failed to send message. Please try again later.');
            });
    });
}
// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle between bars and times icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    contactFormSubmission();
});
// Contact Us PageSimple FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

//Project Page Tab Filter
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.tab-button');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Toggle active class on buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter project cards
            cards.forEach(card => {
                const category = card.querySelector('.project-category')?.textContent?.trim();

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
const motiveSelect = document.getElementById('motive');
const otherMotiveGroup = document.getElementById('otherMotiveGroup');

if (motiveSelect && otherMotiveGroup) {
    motiveSelect.addEventListener('change', function () {
        if (this.value === 'other') {
            otherMotiveGroup.style.display = 'block';
        } else {
            otherMotiveGroup.style.display = 'none';
        }
    });
}

//Donate Now Page Form Submission
function donateFormSubmission() {
    const donorForm = document.getElementById('donorForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    emailjs.init('_1EIg4F8iO2L2gQSq'); // replace with your EmailJS public key


    document.getElementById('donorForm').addEventListener('submit', function (e) {
        e.preventDefault(); // prevent page reload

        emailjs.sendForm('service_7zelifg', 'template_z661ou8', this)
            .then(() => {
                // Hide form and show thank you message
                donorForm.style.display = 'none';
                thankYouMessage.style.display = 'block';
                this.reset();
                thankYouMessage.scrollIntoView({ behavior: 'smooth' });
            }, (error) => {
                console.error('FAILED...', error);
                alert('Failed to send message. Please try again later.');
            });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    donateFormSubmission();
});


const carouselTrack = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const cards = Array.from(carouselTrack.children);
let currentIndex = 0;

function renderCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove("active");
        const relativeIndex = (index - currentIndex + cards.length) % cards.length;
        card.style.order = relativeIndex;
        card.style.transform = "scale(1)";
        card.style.opacity = "0.6";
    });

    const activeIndex = (currentIndex + 2) % cards.length;
    cards[activeIndex].classList.add("active");
    cards[activeIndex].style.transform = "scale(1.5)";
    cards[activeIndex].style.opacity = "1";

    document.querySelectorAll(".carousel-dots .dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === activeIndex);
    });
}

function createDots() {
    cards.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            currentIndex = (i - 2 + cards.length) % cards.length;
            renderCarousel();
        });
        dotsContainer.appendChild(dot);
    });
}

function startCarousel() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        renderCarousel();
    }, 3000);
}

createDots();
renderCarousel();
startCarousel();
//mobile menu
initializeMobileMenu();
// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});


// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Here you would typically send the email to a server
        console.log('Newsletter subscription:', email);

        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Intersection Observer for Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.hero-content, .about-content, .gallery-grid, .contact-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(element);
});
// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add active class to current navigation link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Navbar Scroll Behavior
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');

    // Check if we're on the home page
    if (heroSection) {
        // Initial state check
        checkScroll();

        // Scroll event listener
        window.addEventListener('scroll', checkScroll);
    }

    // Function to check scroll position and update navbar
    function checkScroll() {
        if (window.scrollY <= 0) {
            // At the very top of the page
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
    }
});