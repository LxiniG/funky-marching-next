"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { buildApiUrl, getImageUrl as getStrapiImageUrl } from '@/lib/strapi-url';
import { StrapiImage } from '@/types/strapi';
import { Globe } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ErrorState from '../../components/custom/error-state/ErrorState';
import styles from "./Bandleader.module.css";

interface Props { }

interface BandleaderData {
    id: number;
    title: string;
    about: string;
    websiteLink: string;
    bandleaderImage: StrapiImage;
}

async function getBandleaderData(): Promise<any> {
    const apiUrl = buildApiUrl('bandleader-page?populate=*');
    const res = await fetch(apiUrl);

    if (!res.ok) {
        throw new Error("Failed to fetch bandleader data from Strapi");
    }

    const data = await res.json();
    console.log("🚀 ~ getBandleaderData ~ data:", data);
    return data;
}

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    const [bandleaderData, setBandleaderData] = useState<BandleaderData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('🚀 Bandleader useEffect triggered');
        const fetchBandleaderData = async () => {
            try {
                console.log('🚀 Starting to fetch bandleader data...');
                setIsLoading(true);
                setError(null);
                const strapiData = await getBandleaderData();
                console.log('🚀 Received bandleader data:', strapiData);

                const mappedData: BandleaderData = {
                    id: strapiData.data.id,
                    title: strapiData.data.title,
                    about: strapiData.data.about,
                    websiteLink: strapiData.data.websiteLink,
                    bandleaderImage: strapiData.data.bandleaderImage
                };

                console.log('🚀 Mapped bandleader data:', mappedData);
                setBandleaderData(mappedData);
            } catch (err) {
                console.error('❌ Error fetching bandleader data:', err);
                setError('Failed to load bandleader data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBandleaderData();
    }, []);

    const handleRetry = () => {
        setError(null);
        setIsLoading(true);
        // Re-trigger the useEffect by updating a dependency or call fetch function directly
        const fetchBandleaderData = async () => {
            try {
                const strapiData = await getBandleaderData();
                const mappedData: BandleaderData = {
                    id: strapiData.data.id,
                    title: strapiData.data.title,
                    about: strapiData.data.about,
                    websiteLink: strapiData.data.websiteLink,
                    bandleaderImage: strapiData.data.bandleaderImage
                };
                setBandleaderData(mappedData);
            } catch (err) {
                setError('Failed to load bandleader data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchBandleaderData();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Skeleton className="w-[300px] h-[300px] rounded-full" />
                </div>

                <div className="mb-6">
                    <Skeleton className="h-10 w-64 mx-auto" />
                </div>

                <div className={styles.textContent}>
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-4/5 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                </div>

                <div className={styles.websiteLink}>
                    <Skeleton className="h-12 w-48" />
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={styles.container}>
                <ErrorState
                    title="Bandleader Daten konnten nicht geladen werden"
                    message="Es gab ein Problem beim Laden der Bandleader-Informationen. Bitte versuche es später erneut."
                    onRetry={handleRetry}
                />
            </div>
        );
    }

    // Success state with data
    if (!bandleaderData) return null;
    return (
        <div className={styles.container}>
            {/* Circle Image */}
            <div className={styles.imageContainer}>
                <Image
                    src={getStrapiImageUrl(bandleaderData.bandleaderImage)}
                    alt={bandleaderData.bandleaderImage.alternativeText || bandleaderData.title}
                    width={300}
                    height={300}
                    className={styles.circleImage}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <h1 className={styles.name}>{bandleaderData.title}</h1>
            <div className={styles.textContent}>
                {/* Split biography by paragraphs and render each as a separate <p> */}
                {bandleaderData.about.split('\n\n').map((paragraph, index) => (
                    <p key={index}>
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Website Link */}
            {bandleaderData.websiteLink && (
                <div className={styles.websiteLink}>
                    <Button asChild size="lg" className="gap-2">
                        <a
                            href={bandleaderData.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Globe className="w-4 h-4" />
                            Zu Jörgens Website
                        </a>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Page
