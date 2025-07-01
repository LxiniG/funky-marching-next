import styles from "./Contact.module.css";

const contacts = [
    {
        title: "Booking:",
        name: "Karin Lorenz",
        tel: "0761-5901960",
        email: "funkymarchingband@t-online.de",
        website: null,
    },
    {
        title: "Bandleader:",
        name: "Jörgen Welander",
        tel: "0162-9628398",
        email: "funkymarchingband@email.de",
        website: "www.welander.de",
    },
];

export default function ContactPage() {
    return (
        <div className={styles.contactPage}>
            <h1 className={styles.contactTitle}>Kontakt</h1>
            <div className={styles.cardsRow}>
                {contacts.map((c, i) => (
                    <div className={styles.contactCard} key={c.name}>
                        <img src="/fmb-logo-light.png" alt="FMB Logo" className={styles.contactLogo} />
                        <div className={styles.contactContent}>
                            <h3>{c.title}</h3>
                            <div>{c.name}</div>
                            <div>Tel.: {c.tel}</div>
                            <div>{c.email}</div>
                            {c.website && (
                                <div>
                                    <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer">{c.website}</a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
