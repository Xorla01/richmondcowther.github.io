document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form form');
    const button = form.querySelector('button[type="submit"]');
    const status = document.createElement('div');
    status.style.marginTop = '10px';
    form.appendChild(status);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        button.disabled = true;
        status.textContent = 'Sending...';

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                status.textContent = 'Message sent! Thank you for reaching out.';
                form.reset();
            } else {
                response.json().then(data => {
                    status.textContent = data.message || 'Oops! There was a problem sending your message.';
                });
            }
            button.disabled = false;
        })
        .catch(() => {
            status.textContent = 'Network error. Please try again.';
            button.disabled = false;
        });
    });
});