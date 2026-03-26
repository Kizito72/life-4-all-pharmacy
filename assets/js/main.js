/**
 * Life 4 All Pharmacy - Main JavaScript
 * Handles mobile menu, smooth scrolling, and form validation
 */

(function($) {
    'use strict';
    
    // ========================================
    // Document Ready
    // ========================================
    $(document).ready(function() {
        
        // Initialize all functions
        initNavigation();
        initSmoothScroll();
        initContactForm();
        initScrollAnimations();
        setActiveNav();
        
    });
    
    // ========================================
    // Navigation Functions
    // ========================================
    function initNavigation() {
        // Close mobile menu when link is clicked
        $('.navbar-nav .nav-link').on('click', function() {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });
        
        // Navbar scroll effect
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 50) {
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
        });
    }
    
    // ========================================
    // Set Active Navigation Item
    // ========================================
    function setActiveNav() {
        var currentPage = window.location.pathname.split('/').pop();
        
        // Default to index.html if no page specified
        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }
        
        // Add active class to matching nav link
        $('.navbar-nav .nav-link').each(function() {
            var linkHref = $(this).attr('href');
            if (linkHref === currentPage) {
                $(this).addClass('active');
            }
        });
    }
    
    // ========================================
    // Smooth Scrolling
    // ========================================
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        });
    }
    
    // ========================================
    // Contact Form Validation & Handling
    // ========================================
    function initContactForm() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            $('.error-message').remove();
            $('.form-control').removeClass('is-invalid');
            
            var isValid = true;
            var name = $('#name').val().trim();
            var email = $('#email').val().trim();
            var phone = $('#phone').val().trim();
            var message = $('#message').val().trim();
            
            // Validate name
            if (name === '') {
                showError('#name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('#name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('#email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('#email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone (optional but if provided, check format)
            if (phone !== '' && !isValidPhone(phone)) {
                showError('#phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('#message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('#message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If all valid, show success message
            if (isValid) {
                showSuccessMessage();
                $('#contactForm')[0].reset();
            }
            
            return false;
        });
    }
    
    // ========================================
    // Validation Helper Functions
    // ========================================
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Remove spaces, dashes, and parentheses
        var cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        // Check if it's a valid phone number (8-15 digits, optionally starting with +)
        var phoneRegex = /^\+?[0-9]{8,15}$/;
        return phoneRegex.test(cleanPhone);
    }
    
    function showError(fieldId, message) {
        var field = $(fieldId);
        field.addClass('is-invalid');
        field.after('<div class="error-message text-danger mt-1" style="font-size: 0.875rem;">' + message + '</div>');
    }
    
    function showSuccessMessage() {
        var successHtml = `
            <div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
                <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        $('#contactForm').before(successHtml);
        
        // Scroll to success message
        $('html, body').animate({
            scrollTop: $('.alert-success').offset().top - 100
        }, 500);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $('.alert-success').fadeOut(400, function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    // ========================================
    // Scroll Animations
    // ========================================
    function initScrollAnimations() {
        // Add fade-in animation to elements when they come into view
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe cards and sections
        document.querySelectorAll('.card, .service-card, .testimonial, .product-card').forEach(function(el) {
            observer.observe(el);
        });
    }
    
})(jQuery);

// ========================================
// Back to Top Button (Optional Enhancement)
// ========================================
window.addEventListener('scroll', function() {
    var scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        if (window.pageYOffset > 300) {
            scrollTop.style.display = 'block';
        } else {
            scrollTop.style.display = 'none';
        }
    }
});
