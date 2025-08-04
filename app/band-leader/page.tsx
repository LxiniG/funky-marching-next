"use client"

import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from "./Bandleader.module.css";

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return (
        <div className={styles.container}>
            {/* Circle Image */}
            <div className={styles.imageContainer}>
                <Image
                    src="/bandleader-image.jpg"
                    alt="Jörgen Welander"
                    width={300}
                    height={300}
                    className={styles.circleImage}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Name */}
            <h1 className={styles.name}>Jörgen Welander</h1>

            {/* About Text */}
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
                <p>
                    Zu den Highlights seiner Karriere gehören mehrere Europatourneen mit "Howard Johnson & Gravity". Er spielt regelmäßig in verschiedenen Formationen, u.a. in Jazz-, Rock-, Funk- und Folkbands sowie in Projekten für Neue Musik und Theater.
                </p>
                <p>
                    Er gehört zu den wenigen Tubisten Deutschlands, die die Tuba professionell in den populären Stilrichtungen als Bassist und Solist einsetzen.
                </p>
                <p>
                    Im Jahr 2005 gründete er die Funky Marching Band an drei Musikschulen (Jazz & Rock Schulen Freiburg, Musiclab Emmendingen und Musikschule Freiburg), für die er die Stücke in Maßarbeit zugeschneidert komponiert und arrangiert.
                </p>
            </div>

            {/* Website Link */}
            <div className={styles.websiteLink}>
                <Button asChild size="lg" className="gap-2">
                    <a
                        href="https://www.welander.de"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Globe className="w-4 h-4" />
                        Zu Jörgens Website
                    </a>
                </Button>
            </div>
        </div>
    )
}

export default Page
