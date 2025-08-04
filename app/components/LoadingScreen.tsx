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
    'ma3.png',
    'ma4.png',
    'ma5.png',
];

export default function LoadingScreen({ isLoading, onAnimationComplete }: LoadingScreenProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
    const [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        // Set minimum loading time of 5 seconds
        const minLoadingTimer = setTimeout(() => {
            console.log('Minimum loading time (5s) passed');
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

            {!isAnimating && (
                <div className={styles.circleContainer}>
                    <div className={styles.circle}>
                        <div className={styles.imageRow}>
                            {[...mannequinImages, ...mannequinImages].map((imageName, index) => (
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
