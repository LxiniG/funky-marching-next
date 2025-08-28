"use client";
import { Gig } from "@/types";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./NextGigBanner.module.css";

interface Props {
    isVisible: boolean;
    gig?: Gig;
}

const NextGigBanner: NextPage<Props> = ({ isVisible, gig }) => {
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

    if (!show || !gig) {
        return null;
    }

    const formattedDate = gig.gigStartDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    return (
        <Link href="/gigs" className={`${styles.nextGigBox} ${animationClass}`}>
            <h2>{formattedDate}</h2>
            <div className={styles.nextGigBoxContent}>
                <p>Unser nächster Gig:</p>
                <p>{gig.gigTitle}</p>
            </div>
        </Link>
    );
};

export default NextGigBanner;