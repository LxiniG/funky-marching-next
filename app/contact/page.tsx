import { Mail } from "lucide-react";
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
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Mail className="w-8 h-8 mr-3" />
                    Kontakt
                </h1>
            </div>

            <div className={styles.contactSection}>
                {contacts.map((contact, index) => (
                    <div key={contact.name} className={styles.contactGroup}>
                        <h2 className={styles.contactTitle}>{contact.title}</h2>

                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactValue}>{contact.name}</span>
                            </div>

                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Telefon:</span>
                                <a
                                    href={`tel:${contact.tel}`}
                                    className={styles.contactLink}
                                >
                                    {contact.tel}
                                </a>
                            </div>

                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>E-Mail:</span>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className={styles.contactLink}
                                >
                                    {contact.email}
                                </a>
                            </div>

                            {contact.website && (
                                <div className={styles.contactItem}>
                                    <span className={styles.contactLabel}>Website:</span>
                                    <a
                                        href={`https://${contact.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        {contact.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className={styles.additionalInfo}>

                    <h3 className={styles.infoTitle}>Presse</h3>
                    <p className={styles.infoText}>
                        Presseinformationen mit Downloads finden sich im Pressebereich
                    </p>
                </div>
            </div>
        </div>
    );
}
