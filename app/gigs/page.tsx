"use client";

import gigs from '../../data/gigs.json';
import styles from './Gigs.module.css';

interface Gig {
    date: string;
    time?: string;
    location: string;
    venue: string;
    tickets_url: string;
}

const GigsPage = () => {
    const now = new Date();
    const upcomingGigs = (gigs as Gig[])
        .map(gig => ({ ...gig, date: new Date(gig.date) }))
        .filter(gig => gig.date >= now)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
                                <p className={styles.month}>{gig.date.toLocaleString('de-DE', { month: 'short' })}</p>
                                <h2 className={styles.day}>{gig.date.getDate()}</h2>
                            </div>

                            <a
                                href={gig.tickets_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['timeline-float-link']}
                            >
                                <div className={styles['timeline-float-box']}>
                                    <p className={styles['timeline-tickets-link']}>{gig.tickets_url}</p>
                                </div>
                            </a>
                            <div onClick={() => window.open(gig.tickets_url, '_blank', 'noopener,noreferrer')}
                                className={styles['timeline-content']}>
                                <h2>{gig.venue}</h2>
                                <p className={styles['timeline-date']}>
                                    {gig.date.toLocaleDateString('de-DE')}
                                    {gig.time && (
                                        <span> - {gig.time} Uhr</span>
                                    )}
                                </p>
                                <p>{gig.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GigsPage;
