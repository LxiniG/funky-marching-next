import { NextPage } from 'next';
import styles from './Button.module.css';
import Image from 'next/image';

interface Props {
    text: string;
    icon?: string;
    link?: string;
}

const Button: NextPage<Props> = ({ text, icon, link }) => {
    const buttonContent = (
        <button className={styles.fmbButton}>
            {icon && <Image src={icon} alt="icon" width={20} height={20} className={styles.icon} />}
            <span className={styles.buttonText}>{text}</span>
        </button>
    );

    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
};

export default Button;