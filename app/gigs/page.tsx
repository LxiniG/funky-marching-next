
"use client";

import { Gig, StrapiGigResponse } from '@/types';
import { useEffect, useState } from 'react';
import styles from './Gigs.module.css';

async function getGigs() {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';
    const api = '/api/gigs'

    const url = new URL(api, baseUrl)
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch gigs from Strapi");
    }

    const data = await res.json();
    console.log("🚀 ~ getGigs ~ data:", data)
    return data;
}

function mapStrapiDataToGigs(strapiResponse: StrapiGigResponse): Gig[] {
    return strapiResponse.data.map(item => ({
        gigStartDate: new Date(item.gigStartDate),
        gigTitle: item.gigTitle,
        gigLocation: item.gigLocation,
        gigLink: item.gigLink
    }));
}

const GigsPage = () => {
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                setLoading(true);
                const strapiData = await getGigs();
                const mappedGigs = mapStrapiDataToGigs(strapiData);
                setGigs(mappedGigs);
            } catch (err) {
                console.error('Error fetching gigs:', err);
                setError('Failed to load gigs');
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingGigs = gigs
        .filter(gig => gig.gigStartDate >= today)
        .sort((a, b) => a.gigStartDate.getTime() - b.gigStartDate.getTime());

    if (loading) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <div className={styles['gigs-red-hue']} />
                <div className={styles.container}>
                    <p>Gigs werden geladen...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <div className={styles['gigs-red-hue']} />
                <div className={styles.container}>
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }



    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className={styles['gigs-red-hue']} />
            <div className={styles.container}>
                <div className={styles.timeline}>
                    <div className={`${styles['timeline-item']} ${styles['current-date-marker']}`}>
                        <div className={styles['timeline-date-box']}>
                            <p className={styles.month}>{today.toLocaleString('de-DE', { month: 'short' })}</p>
                            <h2 className={styles.day}>{today.getDate()}</h2>
                        </div>
                        <div className={styles['timeline-content']}>
                            <p className={styles['timeline-date']}>Heute</p>
                        </div>
                    </div>
                    {upcomingGigs.map((gig, index) => (
                        <div key={index} className={styles['timeline-item']}>
                            <div className={styles['timeline-date-box']}>
                                <p className={styles.month}>{gig.gigStartDate.toLocaleString('de-DE', { month: 'short' })}</p>
                                <h2 className={styles.day}>{gig.gigStartDate.getDate()}</h2>
                            </div>
                            {gig.gigLink && (
                                <a
                                    href={gig.gigLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles['timeline-float-link']}
                                >
                                    <div className={styles['timeline-float-box']}>
                                        <p className={styles['timeline-tickets-link']}>Zur Website</p>
                                    </div>
                                </a>
                            )}

                            <div
                                onClick={() => gig.gigLink && window.open(gig.gigLink, '_blank', 'noopener,noreferrer')}
                                className={styles['timeline-content']}
                                style={{ cursor: gig.gigLink ? 'pointer' : 'default' }}
                            >
                                <h2>{gig.gigTitle}</h2>
                                <p className={styles['timeline-date']}>
                                    {gig.gigStartDate.toLocaleDateString('de-DE')}
                                    <span> - {gig.gigStartDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr</span>
                                </p>
                                <p>{gig.gigLocation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GigsPage;
