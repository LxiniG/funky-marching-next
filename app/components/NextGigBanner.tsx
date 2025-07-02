"use client";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./NextGigBanner.module.css";

interface Props {
    isVisible: boolean;
}

const NextGigBanner: NextPage<Props> = ({ isVisible }) => {
    const [show, setShow] = useState(false);
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            setAnimationClass(styles.nextGigBoxAnimatedIn);
        } else {
            setAnimationClass(styles.nextGigBoxAnimatedOut);
            const timer = setTimeout(() => setShow(false), 500); // match animation duration
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!show) {
        return null;
    }

    return (
        <Link href="/gigs" className={`${styles.nextGigBox} ${animationClass}`}>
            <h2>24.06.25</h2>
            <div className={styles.nextGigBoxContent}>
                <p>Unser nächster Gig:</p>
                <p>FMB spielt beim Johannimarkt in Grenzach-Whylen</p>
            </div>
        </Link>
    );
};

export default NextGigBanner;