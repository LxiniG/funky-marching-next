"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from "./Bandleader.module.css";

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    // Multiple images for the carousel
    const bandleaderImages = [
        {
            src: "/joergen-horn.jpeg",
            alt: "Jörgen Welander mit Horn"
        },
        {
            src: "/joergen-horn.jpeg", // You can add more images here
            alt: "Jörgen Welander Performance"
        },
        {
            src: "/joergen-horn.jpeg", // Placeholder - replace with actual images
            alt: "Jörgen Welander Workshop"
        }
    ];

    return (
        <div className={styles.bentoContainer}>
            {/* Background Images with Stacked Effect */}
            <div className={styles.imageBackground}>
                <div className={styles.imageStack}>
                    {bandleaderImages.map((image, index) => (
                        <div 
                            key={index} 
                            className={`${styles.stackedImage} ${styles[`image${index + 1}`]}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={320}
                                height={400}
                                className={styles.bandleaderImg}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Biography Text Box */}
            <div className={styles.bentoBox + ' ' + styles.textBox}>
                <h2 className={styles.boxTitle}>Über den Bandleader</h2>
                <div className={styles.textContent}>
                    <p>
                        Geboren in Schweden, lebt seit vielen Jahren in Deutschland als freiberuflicher Tubist und E-Bassist. Nach seinem Studium an der Hochschule für Musik in Freiburg setzte er seine Laufbahn als erfolgreicher Jazzmusiker fort.
                    </p>
                    <p>
                        Er ist Dozent an der Hochschule für Kunst, Design und Populäre Musik (hKDM) bzw. das International Music College Freiburg (IMCF) und unterrichtet am Musiclab Emmendingen und in der Musikschule Freiburg.
                    </p>
                    <p>
                        Jörgen Welander gibt regelmäßig Workshops für Brassbands, Bandcoaching und Improvisation. Langjährige Erfahrung als Bandleader, Komponist und Arrangeur in vielen unterschiedlichen Musikstilrichtungen.
                    </p>
                </div>
            </div>

            {/* Career Highlights Box */}
            <div className={styles.bentoBox + ' ' + styles.highlightsBox}>
                <h2 className={styles.boxTitle}>Karriere Highlights</h2>
                <div className={styles.textContent}>
                    <p>
                        Zu den Highlights seiner Karriere gehören mehrere Europatourneen mit "Howard Johnson & Gravity". Er spielt regelmäßig in verschiedenen Formationen, u.a. in Jazz-, Rock-, Funk- und Folkbands sowie in Projekten für Neue Musik und Theater.
                    </p>
                    <p>
                        Er gehört zu den wenigen Tubisten Deutschlands, die die Tuba professionell in den populären Stilrichtungen als Bassist und Solist einsetzen.
                    </p>
                </div>
            </div>

            <div className={styles.bentoBox + ' ' + styles.fmbBox}>
                <h2 className={styles.boxTitle}>Funky Marching Band</h2>
                <div className={styles.textContent}>
                    <p>
                        Im Jahr 2005 gründete er die Funky Marching Band an drei Musikschulen (Jazz & Rock Schulen Freiburg, Musiclab Emmendingen und Musikschule Freiburg), für die er die Stücke in Maßarbeit zugeschneidert komponiert und arrangiert.
                    </p>
                </div>
            </div>

            <div className={styles.bentoBox + ' ' + styles.linkBox}>
                <h2 className={styles.boxTitle}>Mehr erfahren</h2>
                <div className={styles.websiteLink}>
                    <a
                        href="https://www.welander.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteLinkText}
                    >
                        <svg className={styles.globeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                        </svg>
                        Zu Jörgens Website
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Page