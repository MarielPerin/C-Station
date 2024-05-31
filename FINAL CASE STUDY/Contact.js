document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        clearMessages();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let subject = document.getElementById('subject').value;
        let message = document.getElementById('message').value;
        let valid = true;

        if (name.trim() === "") {
            showError('name', 'Name is required');
            valid = false;
        }

        if (email.trim() === "") {
            showError('email', 'Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Email is not valid');
            valid = false;
        }

        if (subject.trim() === "") {
            showError('subject', 'Subject is required');
            valid = false;
        }

        if (message.trim() === "") {
            showError('message', 'Message is required');
            valid = false;
        }

        if (valid) {
            // Simulate a successful submission
            alert('Form submitted successfully');
            contactForm.reset();
        }
    });

    function showError(field, message) {
        let element = document.getElementById(field);
        element.classList.add('error');
        let errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        element.parentElement.appendChild(errorElement);
    }

    function clearMessages() {
        let errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(message) {
            message.remove();
        });

        let errorFields = document.querySelectorAll('.error');
        errorFields.forEach(function(field) {
            field.classList.remove('error');
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
});
