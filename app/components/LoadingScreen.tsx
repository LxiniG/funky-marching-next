"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    isLoading: boolean;
    onAnimationComplete: () => void;
}

const mannequinImages = [
    'ma1.png',
    'ma2.png',
    'ma3.png',
    'ma4.png',
    'ma5.png',
    'ma6.png'
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function LoadingScreen({ isLoading, onAnimationComplete }: LoadingScreenProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
    const [shouldHide, setShouldHide] = useState(false);


    useEffect(() => {
        const minLoadingTimer = setTimeout(() => {
            setMinLoadingTimePassed(true);
        }, 2500);

        return () => clearTimeout(minLoadingTimer);
    }, []);

    useEffect(() => {
        console.log('Loading state changed:', { isLoading, minLoadingTimePassed, isAnimating });
        if (!isLoading && minLoadingTimePassed && !isAnimating) {
            console.log('Starting animation sequence');
            // Start animation when both loading is complete and minimum time has passed
            setIsAnimating(true);

            // Complete animation after transition duration
            const timer = setTimeout(() => {
                console.log('Animation complete, calling onAnimationComplete');
                setShouldHide(true);
                onAnimationComplete();
            }, 1200); // Match the CSS transition duration

            return () => clearTimeout(timer);
        }
    }, [isLoading, minLoadingTimePassed, isAnimating, onAnimationComplete]);

    // Only hide after animation is completely done
    if (shouldHide) {
        return null;
    }

    return (
        <div className={styles.loadingContainer}>
            <div className={`${styles.topBox} ${isAnimating ? styles.animateTop : ''}`} />
            <div className={`${styles.bottomBox} ${isAnimating ? styles.animateBottom : ''}`} />

            {!isAnimating && mannequinImages.length > 0 && (
                <div className={styles.circleContainer}>
                    <div className={styles.circle}>
                        <div className={styles.imageRow}>
                            {[...mannequinImages, ...mannequinImages, ...mannequinImages].map((imageName, index) => (
                                <Image
                                    key={index}
                                    src={`/fmb-loader-mannequins/${imageName}`}
                                    alt="FMB Mannequin"
                                    width={60}
                                    height={80}
                                    className={styles.mannequinImage}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
