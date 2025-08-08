import { useState } from 'react';
import { buildApiUrl } from './strapi-url';

interface EmailOptions {
    to: string;
    cc?: string;
    subject: string;
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

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send email');
            }

            setIsLoading(false);
            return { success: true, data };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            setIsLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    const sendNewsletterSubscriptionEmail = async (subscriberEmail: string, firstName?: string, lastName?: string): Promise<SendEmailResponse> => {
        const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'Name nicht angegeben';

        const body = {
            to: 'linus.bung@gmx.de',
            cc: 'info@funkymarchingband.com',
            subject: 'Neue Newsletter-Anmeldung - FMB',
            html: `
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
