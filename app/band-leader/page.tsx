"use client"

import { NextPage } from 'next';
import styles from "./Bandleader.module.css";

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return (
        <div className={styles.bandleaderBgWrapper}>
            <div className={styles.bandleaderContainer}>
                <div className={styles.imageSection}>
                    <img
                        src="/joergen-horn.jpeg"
                        alt="Jörgen Welander Bandleader"
                        className={styles.bandleaderImg}
                    />
                </div>
                <div className={styles.textSection}>
                    <div className={styles.textContent}>
                        <h1>Jörgen Welander</h1>
                        <p>
                            geboren in Schweden, lebt seit vielen Jahren in Deutschland als freiberuflicher Tubist und E-Bassist. Nach seinem Studium an der Hochschule für Musik in Freiburg setzte er seine Laufbahn als erfolgreicher Jazzmusiker fort. Er ist Dozent an der Hochschule für Kunst, Design und Populäre Musik (hKDM) bzw. das International Music College Freiburg (IMCF) und unterrichtet am Musiclab Emmendingen und in der Musikschule Freiburg.
                        </p>
                        <p>
                            Jörgen Welander gibt regelmäßig Workshops für Brassbands, Bandcoaching und Improvisation. Langjährige Erfahrung als Bandleader, Komponist und Arrangeur in vielen unterschiedlichen Musikstilrichtungen.
                        </p>
                        <p>
                            Zu den Highlights seiner Karriere gehören mehrere
                            Europatourneen mit "Howard Johnson & Gravity".
                            Er spielt regelmäßig in verschiedenen Formationen,
                            u.a. in Jazz-, Rock-, Funk- und Folkbands sowie in
                            Projekten für Neue Musik und Theater. Er gehört zu
                            den wenigen Tubisten Deutschlands, die die Tuba
                            professionell in den populären Stilrichtungen als
                            Bassist und Solist einsetzen.
                        </p>
                        <p>
                            Im Jahr 2005 gründete er die Funky Marching Band
                            an drei Musikschulen (Jazz & Rock Schulen Freiburg,
                            Musiclab Emmendingen und Musikschule
                            Freiburg), für die er die Stücke in Maßarbeit
                            zugeschneidert komponiert
                            und arrangiert.
                        </p>
                        <div className={styles.websiteLink}>
                            <a
                                href="https://www.welander.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.websiteLinkText}
                            >
                                Zu Jörgens Website
                                <img
                                    src="/globe.svg"
                                    alt="Website"
                                    className={styles.globeIcon}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page