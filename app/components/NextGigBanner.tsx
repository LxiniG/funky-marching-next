"use client";
import { NextPage } from "next";
import Link from "next/link";
import { LinkOutline } from "react-ionicons";
import Button from "./Button";
import { useEffect, useState } from "react";

interface Props {
    isVisible: boolean;
}

const NextGigBanner: NextPage<Props> = ({ isVisible }) => {
    const [show, setShow] = useState(isVisible);
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            setAnimationClass("next-gig-box-animated-in");
        } else {
            setAnimationClass("next-gig-box-animated-out");
            const timer = setTimeout(() => setShow(false), 500); // match animation duration
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!show) {
        return null;
    }

    return (
        <div className={`next-gig-box ${animationClass}`}>
            <h2>24.06.25</h2>
            <div className="next-gig-box-content">
                <h3>Unser nächster Gig 📆</h3>
                <p>FMB spielt beim Johannimarkt in Grenzach-Whylen</p>
            </div>
        </div>
    );
};

export default NextGigBanner;