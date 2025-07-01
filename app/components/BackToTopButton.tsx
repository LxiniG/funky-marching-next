"use client";

import { useEffect, useState } from 'react';
import styles from './BackToTopButton.module.css';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        setIsClicked(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        // Reset the animation after it finishes
        setTimeout(() => {
            setIsClicked(false);
        }, 1000); // Animation duration is 1s
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={`${styles.buttonContainer} ${isVisible ? styles.show : ''}`}>
            <button onClick={scrollToTop} className={`${styles.button} ${isClicked ? styles.clicked : ''}`}>
                <span className={styles.arrow}>↑</span>
            </button>
        </div>
    );
};

export default BackToTopButton;
