'use client';

import { getImageUrl as getStrapiImageUrl } from '@/lib/strapi-url';
import { StrapiImage } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PagePreview.module.css';

interface PagePreviewProps {
    title: string;
    description: string;
    image: StrapiImage;
    linkUrl: string;
}



const PagePreview: React.FC<PagePreviewProps> = ({ title, description, image, linkUrl }) => {
    return (
        <Link href={linkUrl} className={styles.previewContainer}>
            <div className={styles.imageContainer}>
                <Image src={getStrapiImageUrl(image)} alt={title} width={image.width} height={image.height} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    );
};

export default PagePreview;
