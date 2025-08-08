"use client";
import ErrorState from "@/components/custom/error-state/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { buildApiUrl, getImageUrl as getStrapiImageUrl } from "@/lib/strapi-url";
import { StrapiFile, StrapiImage } from "@/types/strapi";
import { Download, FileText, Image as ImageIcon, Newspaper } from "lucide-react";
import { NextPage } from 'next';
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Press.module.css";

interface Props { }

interface StrapiPressPage {
    id: number;
    pressTextPDF: StrapiFile;
    pressImage1: StrapiImage;
    pressImage2: StrapiImage;
    pressImage3: StrapiImage;
    createdAt: string;
    updatedAt: string;
}

async function fetchPressPage(): Promise<StrapiPressPage | null> {
    const apiUrl = buildApiUrl('press-page?populate=*');
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch press text from Strapi");
    }
    const data = await response.json();
    return data["data"];
}

const Page: NextPage<Props> = ({ }) => {
    const [pressPage, setPressPage] = useState<StrapiPressPage | null>(null);
    const [pressPageLoading, setPressPageLoading] = useState(true);
    const [pressPageError, setPressPageError] = useState<string | null>(null);

    useEffect(() => {
        const loadPressPage = async () => {
            try {
                setPressPageLoading(true);
                setPressPageError(null);
                const response = await fetchPressPage();
                setPressPage(response);
            } catch (err) {
                console.error('Error fetching press page:', err);
                setPressPageError('Failed to load press page');
            } finally {
                setPressPageLoading(false);
            }
        };
        loadPressPage();
    }, []);

    const handleDownloadPressText = () => {
        if (!pressPage || !pressPage.pressTextPDF) return;

        const pdfUrl = getStrapiImageUrl(pressPage.pressTextPDF);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pressPage.pressTextPDF.name || 'presse-text.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadImage = (image: StrapiImage) => {
        const imageUrl = getStrapiImageUrl(image);
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = image.alternativeText || 'presse-bild.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Newspaper className="w-8 h-8 mr-3" />
                    Presse & Medien
                </h1>
                <p className={styles.description}>
                    Downloadbereich mit Bildern und Texten
                </p>
            </div>

            <div className={styles.pressSection}>
                {/* Press Text Section */}
                <div className={styles.pressKitCard}>
                    {pressPageLoading ? (
                        <div className={styles.loadingSkeleton}>
                            <div className={styles.pressKitHeader}>
                                <FileText className="w-6 h-6 text-blue-600" />
                                <h2>Pressetext</h2>
                            </div>
                            <Skeleton className="h-4 w-3/4 mx-auto mb-4" />
                            <Skeleton className="h-4 w-1/2 mx-auto mb-6" />
                            <Skeleton className="h-10 w-48 mx-auto" />
                        </div>
                    ) : pressPageError ? (
                        <div>
                            <div className={styles.pressKitHeader}>
                                <FileText className="w-6 h-6 text-blue-600" />
                                <h2>Pressetext</h2>
                            </div>
                            <ErrorState message={pressPageError} />
                        </div>
                    ) : pressPage ? (
                        <>
                            <div className={styles.pressKitHeader}>
                                <FileText className="w-6 h-6 text-blue-600" />
                                <h2>Pressetext</h2>
                            </div>
                            <p className={styles.pressKitDescription}>
                                Laden Sie unseren offiziellen Pressetext mit allen wichtigen Informationen
                                über die Band, Bandmitglieder und aktuelle Projekte herunter.
                            </p>
                            <Button
                                variant={"outline"}
                                size="sm"
                                onClick={handleDownloadPressText}
                                className={styles.downloadButton}
                            >
                                <Download className="w-3 h-3 mr-1" />
                                Pressetext herunterladen
                            </Button>
                        </>
                    ) : (
                        <div>
                            <div className={styles.pressKitHeader}>
                                <FileText className="w-6 h-6 text-blue-600" />
                                <h2>Pressetext</h2>
                            </div>
                            <p className={styles.pressKitDescription}>
                                Kein Pressetext verfügbar.
                            </p>
                        </div>
                    )}
                </div>

                {/* Press Images Section */}
                <div className={styles.pressImagesSection}>
                    <div className={styles.sectionHeader}>
                        <ImageIcon className="w-6 h-6 text-green-600" />
                        <h2>Pressebilder</h2>
                    </div>
                    <p className={styles.sectionDescription}>
                        Hochauflösende Bilder der Band für redaktionelle Verwendung.
                        Alle Bilder sind zur kostenfreien Nutzung in Presseberichten freigegeben.
                    </p>

                    {pressPageLoading ? (
                        <div className={styles.imageGrid}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className={styles.imageCard}>
                                    <div className={styles.imageWrapper}>
                                        <Skeleton className="w-full h-full" />
                                    </div>
                                    <div className={styles.imageInfo}>
                                        <Skeleton className="h-4 w-3/4 mb-2" />
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : pressPageError ? (
                        <ErrorState message={pressPageError || 'Unknown error'} />
                    ) : pressPage ? (
                        <div className={styles.imageGrid}>
                            {[pressPage.pressImage1, pressPage.pressImage2, pressPage.pressImage3]
                                .filter(image => image)
                                .map((image, index) => (
                                    <div key={image.id || index} className={styles.imageCard}>
                                        <div className={styles.imageWrapper}>
                                            <Image
                                                src={getStrapiImageUrl(image)}
                                                alt={image.alternativeText || `Pressebild ${index + 1}`}
                                                width={300}
                                                height={200}
                                                className={styles.pressImage}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className={styles.imageInfo}>
                                            <h3 className={styles.imageTitle}>
                                                {image.alternativeText || `Pressebild ${index + 1}`}
                                            </h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownloadImage(image)}
                                                className={styles.downloadButton}
                                            >
                                                <Download className="w-3 h-3 mr-1" />
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className={styles.noDataMessage}>Keine Pressebilder verfügbar.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page