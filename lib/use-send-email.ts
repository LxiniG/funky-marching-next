import { useState } from 'react';
import { buildApiUrl } from './strapi-url';


interface EmailOptions {
    to: string;
    cc?: string;
    subject: string;
    text: string;
    html: string;
}

interface SendEmailResponse {
    success: boolean;
    error?: string;
    data?: any;
}

export function useSendEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendEmail = async (options: EmailOptions): Promise<SendEmailResponse> => {
        setIsLoading(true);
        setError(null);

        const url = buildApiUrl('mail-controller/send');
        const requestBody = JSON.stringify(options);
        const requestConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody
        };

        // Log complete request details
        console.log("🚀 ~ sendEmail ~ FULL REQUEST DETAILS:");
        console.log("URL:", url);
        console.log("Method:", requestConfig.method);
        console.log("Headers:", requestConfig.headers);
        console.log("Body (string):", requestBody);
        console.log("Body (parsed):", options);
        console.log("🚀 ~ sendEmail ~ Request config:", requestConfig);
        console.log("🚀 ~ sendEmail ~ Making request at:", new Date().toISOString());

        try {
            const startTime = performance.now();
            const response = await fetch(url, requestConfig);
            const endTime = performance.now();

            console.log("🚀 ~ sendEmail ~ Request took:", `${endTime - startTime}ms`);
            console.log("🚀 ~ sendEmail ~ RESPONSE DETAILS:");
            console.log("Status:", response.status);
            console.log("Status Text:", response.statusText);
            console.log("Headers:", Object.fromEntries(response.headers.entries()));
            console.log("URL:", response.url);
            console.log("Response type:", response.type);

            // Try to get response text first to see what's actually returned
            const responseText = await response.text();
            console.log("🚀 ~ sendEmail ~ raw response:", responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.log("🚀 ~ sendEmail ~ JSON parse error:", parseError);
                throw new Error(`Invalid JSON response: ${responseText}`);
            }

            console.log("🚀 ~ sendEmail ~ parsed response data:", data);

            if (!response.ok) {
                // Better error message extraction from API response
                const apiError = data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`;
                throw new Error(apiError);
            }

            setIsLoading(false);
            return { success: true, data };
        } catch (err) {
            console.log("🚀 ~ sendEmail ~ full error:", err);

            let errorMessage = 'An unexpected error occurred';

            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            } else if (err && typeof err === 'object') {
                // Handle object errors by stringifying them
                errorMessage = JSON.stringify(err);
                console.log("🚀 ~ sendEmail ~ object error stringified:", errorMessage);
            }

            console.log("🚀 ~ sendEmail ~ final errorMessage:", errorMessage);
            setError(errorMessage);
            setIsLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    const sendNewsletterSubscriptionEmail = async (newsletterContactMailAdress: string, subscriberEmail: string, firstName?: string, lastName?: string): Promise<SendEmailResponse> => {
        const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'Name nicht angegeben';

        const body = {
            "to": 'linus.bung@gmx.de',
            "cc": newsletterContactMailAdress,
            "subject": 'Neue Newsletter-Anmeldung - FMB',
            "text": "Jemand hat sich für den FMB Newsletter angemeldet!",
            "html": `
        <h2>Neue Newsletter-Anmeldung</h2>
        <p>Jemand hat sich für den FMB Newsletter angemeldet!</p>
        <br>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>E-Mail:</strong> ${subscriberEmail}</p>
        <p><strong>Datum:</strong> ${new Date().toLocaleString('de-DE')}</p>
        <hr>
        <p>Dies ist eine automatische Benachrichtigung von der FMB Website.</p>
      `,
        }
        return sendEmail(body);
    };



    return {
        sendEmail,
        sendNewsletterSubscriptionEmail,
        isLoading,
        error,
    };
}
