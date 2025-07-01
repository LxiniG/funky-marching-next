'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PagePreview.module.css';

interface PagePreviewProps {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
}

const PagePreview: React.FC<PagePreviewProps> = ({ title, description, imageUrl, linkUrl }) => {
    return (
        <Link href={linkUrl} className={styles.previewContainer}>
            <div className={styles.imageContainer}>
                <Image src={imageUrl} alt={title} width={200} height={150} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
};

export default PagePreview;
