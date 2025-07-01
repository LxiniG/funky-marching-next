"use client"

import { NextPage } from 'next'
import Image from "next/image";
import { useState } from "react";
import styles from "./Bandleader.module.css";

interface Props { }

const FLAG_COUNT = 30;
const ROTATIONS = [
    -8, -5, -3, 2, 4, 7, -6, 5, -2, 3, 6, -4, 8, -7, 1,
    4, -5, 7, -2, 3, -6, 2, 5, -3, 6, -1, 8, -4, 2
];

const Page: NextPage<Props> = ({ }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div className={styles.bandleaderBgWrapper}>
            <div className={styles.flagGridBg}>
                {Array.from({ length: FLAG_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className={styles.flagCell}
                        style={{
                            transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`
                        }}
                    >
                        <img
                            src="/swedish-flag.png"
                            alt="Swedish flag"
                            className={styles.flagImg}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.bandleaderContent}>
                <div className={styles.bandleaderContentRow}>
                    <img src="/joergen-horn.jpeg"
                        alt="Jörgen Welander Bandleader"
                        height={150}
                        width={0}
                        className={styles.bandleaderImg} />
                    <div className={styles.bandleaderText}>
                        <h1>Jörgen Welander</h1>
                        <p>
                            geboren in Schweden, lebt seit vielen Jahren in Deutschland als freiberuflicher Tubist und E-Bassist. Nach seinem Studium an der Hochschule für Musik in Freiburg setzte er seine Laufbahn als erfolgreicher Jazzmusiker fort. Er ist Dozent an der Hochschule für Kunst, Design und Populäre Musik (hKDM) bzw. das International Music College Freiburg (IMCF) und unterrichtet am Musiclab Emmendingen und in der Musikschule Freiburg.
                            Jörgen Welander gibt regelmäßig Workshops für Brassbands, Bandcoaching und Improvisation. Langjährige Erfahrung als Bandleader, Komponist und Arrangeur in vielen unterschiedlichen Musikstilrichtungen.

                            Zu den Highlights seiner Karriere gehören mehrere
                            Europatourneen mit "Howard Johnson & Gravity“.
                            Er spielt regelmäßig in verschiedenen Formationen,
                            u.a. in Jazz-, Rock-, Funk- und Folkbands sowie in
                            Projekten für Neue Musik und Theater. Er gehört zu
                            den wenigen Tubisten Deutschlands, die die Tuba
                            professionell in den populären Stilrichtungen als
                            Bassist und Solist einsetzen.

                            Im Jahr 2005 gründete er die Funky Marching Band
                            an drei Musikschulen (Jazz & Rock Schulen Freiburg,
                            Musiclab Emmendingen und Musikschule
                            Freiburg), für die er die Stücke in Maßarbeit
                            zugeschneidert komponiert
                            und arrangiert.
                        </p>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "2.5rem 0" }}>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <button
                            className={styles.visitButton + (hovered ? " " + styles.visitButtonHovered : "")}
                            style={{ minWidth: 180 }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={() => window.open("https://www.welander.de", "_blank")}
                        >
                            <span className={styles.buttonTextWrap}>
                                <span className={styles.buttonText + (!hovered ? " " + styles.buttonTextVisible : "")}>Website besuchen</span>
                                <span className={styles.buttonText + (hovered ? " " + styles.buttonTextVisible : "")}>www.welander.de</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page