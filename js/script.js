// Function to load components
function loadComponents() {
    // Load navbar
    fetch('/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            // Initialize mobile menu after navbar is loaded
            initializeMobileMenu();
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
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

// Function to animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const suffix = stat.textContent.match(/[+]$/)?.[0] || '';
        const duration = 2000; // Animation duration in milliseconds
        const start = 0;
        const increment = target / (duration / 16); // Update every 16ms (60fps)

        let current = start;
        const animate = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(animate);
            } else {
                stat.textContent = target + suffix;
            }
        };

        // Start animation when the element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(stat);
    });
}

//donate now page to copy bank details to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        alert('Copied to clipboard: ' + text);
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
}
// Call loadComponents when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadComponents);

// Call animateStats when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
}); 