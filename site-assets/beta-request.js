'use strict';

const betaForm = document.querySelector('#beta-form');

if (betaForm) {
    const productSelect = betaForm.elements.namedItem('product');
    const status = document.querySelector('#beta-status');
    const submitButton = betaForm.querySelector('button[type="submit"]');

    document.querySelectorAll('[data-beta-product]').forEach((link) => {
        link.addEventListener('click', () => {
            productSelect.value = link.dataset.betaProduct;
        });
    });

    betaForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!betaForm.reportValidity()) return;

        submitButton.disabled = true;
        status.textContent = 'Sending your request…';

        try {
            const response = await fetch(betaForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: betaForm.elements.namedItem('email').value, product: productSelect.value })
            });

            if (!response.ok) throw new Error('Beta request submission failed.');

            betaForm.reset();
            status.textContent = 'Request received. We will review it and reply personally; submission does not guarantee beta access.';
        } catch {
            status.textContent = 'The form could not be sent. Use a product-specific email link below instead.';
        } finally {
            submitButton.disabled = false;
        }
    });
}
