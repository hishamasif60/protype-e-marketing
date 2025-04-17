/**
 * Portfolio Website Script
 * Handles mobile navigation toggle and scroll animations.
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle Functionality ---
    const menuToggle = document.querySelector('.menu-toggle'); // The hamburger button
    const navLinks = document.querySelector('.nav-links'); // The <ul> containing nav links

    // Check if both elements exist
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class on the nav links container
            navLinks.classList.toggle('active');

            // Toggle ARIA attribute for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Toggle hamburger/close icon
            const icon = menuToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Change to close icon
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Change back to hamburger icon
            }
        });

        // Close mobile menu if a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if the mobile menu is active before closing
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    // Ensure icon is reset to hamburger
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    } // End of mobile menu toggle logic


    // --- Footer: Automatically Update Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear(); // Set text content to current year
    }


    // --- Simple Fade-In Animation on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
        // Create a new observer instance
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                // If the element is intersecting (visible)
                if (entry.isIntersecting) {
                    // Add the 'is-visible' class to trigger the animation
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing the element once it has animated in
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger animation when 10% of the element is visible
            // rootMargin: '0px 0px -50px 0px' // Optional: Adjust trigger point
        });

        // Observe each element with the 'animate-on-scroll' class
        animatedElements.forEach(el => {
            observer.observe(el);
        });

    } else {
        // Fallback for browsers that don't support IntersectionObserver:
        // Make all elements visible immediately.
        console.log("IntersectionObserver not supported, animations disabled.");
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    } // End of scroll animation logic


    // --- Basic Contact Form Validation Indication (Client-Side Example) ---
    const contactForm = document.getElementById('query-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Get form field values (trimmed)
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            let isValid = true;
            // Simple check for required fields
            if (!name) {
                console.error("Name field is empty.");
                // You could add visual feedback here, e.g., adding an error class
                // nameInput.classList.add('error');
                isValid = false;
            }
             if (!email) {
                console.error("Email field is empty.");
                // emailInput.classList.add('error');
                isValid = false;
            }
             if (!message) {
                console.error("Message field is empty.");
                // messageInput.classList.add('error');
                 isValid = false;
            }

            // If any field is invalid, prevent form submission and maybe alert user
            if (!isValid) {
                 alert('Please fill out all required fields (Name, Email, Message).');
                 event.preventDefault(); // Stop the form from submitting
            } else {
                // IMPORTANT: This is where you would typically send the data
                // using fetch() to your backend or a service like Formspree.
                // The default form submission is prevented below for demonstration
                // unless you set up the 'action' attribute correctly.
                console.log("Form data (front-end):", { name, email, message });
                // Remove the line below if your form 'action' attribute is set up correctly
                // event.preventDefault();
                // alert("Thank you for your message! (This is a front-end confirmation)"); // Example confirmation
            }
        });
    } // End of form validation logic

}); // End of DOMContentLoaded listener
s