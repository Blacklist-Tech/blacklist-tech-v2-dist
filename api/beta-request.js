'use strict';

const PRODUCTS = new Set(['CueArena', 'Upscalr', 'CueMapper']);
const RECIPIENT = 'admin@blacklisttech.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function betaRequest(request, response) {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', 'application/json');

    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
    }

    const body = request.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return response.status(400).json({ error: 'INVALID_REQUEST' });
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const product = typeof body.product === 'string' ? body.product : '';
    if (email.length > 254 || !EMAIL_PATTERN.test(email) || !PRODUCTS.has(product)) {
        return response.status(400).json({ error: 'INVALID_REQUEST' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!apiKey || !from) {
        return response.status(503).json({ error: 'EMAIL_NOT_CONFIGURED' });
    }

    try {
        const providerResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from,
                to: [RECIPIENT],
                reply_to: email,
                subject: `New ${product} beta request`,
                text: `New product beta request\n\nProduct: ${product}\nEmail: ${email}`
            }),
            signal: AbortSignal.timeout(8000)
        });

        if (!providerResponse.ok) {
            return response.status(502).json({ error: 'EMAIL_DELIVERY_FAILED' });
        }
    } catch {
        return response.status(502).json({ error: 'EMAIL_DELIVERY_FAILED' });
    }

    return response.status(202).json({ ok: true });
};
