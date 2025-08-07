"use client";
import ErrorState from "@/components/custom/error-state/ErrorState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildApiUrl, getImageUrl as getStrapiImageUrl } from "@/lib/strapi-url";
import { StrapiImage } from "@/types/strapi";
import { Download, Image as ImageIcon, Music, Video, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";

interface StrapiGalleryImage {
    id: number;
    imageDescription: string;
    imageDate: Date;
    imageTitle: string;
    image: StrapiImage;
}

async function fetchGalleryImages(): Promise<StrapiGalleryImage[]> {
    const apiUrl = buildApiUrl('gallery-images?populate=*');
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch gallery items from Strapi");
    }
    const data = await response.json();
    console.log("🚀 ~ fetchGalleryImages ~ response:", data)
    return data["data"];
}



export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<StrapiGalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadgalleryImages = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchGalleryImages();
                setGalleryImages(response);
            } catch (err) {
                console.error('Error fetching gallery items:', err);
                setError('Failed to load gallery items');
            } finally {
                setLoading(false);
            }
        };
        loadgalleryImages();
    }, []);


    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        setIsDialogOpen(true);
    };

    const handleDownload = (item: StrapiGalleryImage) => {
        const imageUrl = getStrapiImageUrl(item.image);
        const link = document.createElement('a');
        link.href = imageUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <h1>Galerie</h1>
                <p className={styles.description}>
                    Bilder, Audios und Videos von unseren Gigs und Aufnahmen.
                </p>
                <Tabs defaultValue="images" className={styles.tabsContainer}>
                    <TabsList className={styles.tabsList}>
                        <TabsTrigger value="images" className={styles.tabsTrigger}>
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Bilder
                        </TabsTrigger>
                        <TabsTrigger value="videos" className={styles.tabsTrigger}>
                            <Video className="w-4 h-4 mr-2" />
                            Videos
                        </TabsTrigger>
                        <TabsTrigger value="audio" className={styles.tabsTrigger}>
                            <Music className="w-4 h-4 mr-2" />
                            Audio
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="images" className={styles.tabContent}>
                        <div className={styles.imageGrid}>
                            {Array.from({ length: 12 }).map((_, index) => {
                                const heights = ['h-48', 'h-56', 'h-40', 'h-64', 'h-44', 'h-52'];
                                const randomHeight = heights[index % heights.length];

                                return (
                                    <div key={index} className={styles.skeletonCard}>
                                        <Skeleton className={`w-full ${randomHeight} rounded-xl`} />
                                    </div>
                                );
                            })}
                        </div>
                    </TabsContent>

                    <TabsContent value="videos" className={styles.tabContent}>
                        <div className={styles.comingSoon}>
                            <Video className="w-12 h-12 mb-4 text-muted-foreground" />
                            <h2>Videos coming soon!</h2>
                            <p>Wir arbeiten daran, euch bald unsere besten Video-Momente zu zeigen.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="audio" className={styles.tabContent}>
                        <div className={styles.comingSoon}>
                            <Music className="w-12 h-12 mb-4 text-muted-foreground" />
                            <h2>Audio coming soon!</h2>
                            <p>Bald könnt ihr hier unsere Musik hören und downloaden.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        );
    }

    return (

        <div className={styles.container}>
            <h1>Galerie</h1>
            <p className={styles.description}>
                Bilder, Audios und Videos von unseren Gigs und Aufnahmen.
            </p>

            {error && (
                <ErrorState message="Bilder konnten nicht geladen werden."></ErrorState>
            )}

            <Tabs defaultValue="images" className={styles.tabsContainer}>
                <TabsList className={styles.tabsList}>
                    <TabsTrigger value="images" className={styles.tabsTrigger}>
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Bilder ({galleryImages.length})
                    </TabsTrigger>
                    <TabsTrigger value="videos" className={styles.tabsTrigger}>
                        <Video className="w-4 h-4 mr-2" />
                        Videos (0)
                    </TabsTrigger>
                    <TabsTrigger value="audio" className={styles.tabsTrigger}>
                        <Music className="w-4 h-4 mr-2" />
                        Audio (0)
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="images" className={styles.tabContent}>
                    <div className={styles.imageGrid}>
                        {galleryImages.map((item, index) => (
                            <div
                                key={item.id}
                                className={styles.imageCard}
                                onClick={() => handleImageClick(index)}
                            >
                                <Image
                                    src={getStrapiImageUrl(item.image)}
                                    alt={item.imageTitle}
                                    width={300}
                                    height={200}
                                    className={styles.previewImage}
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.imageOverlay}>
                                    <h3 className={styles.imageCardTitle}>{item.imageTitle}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="videos" className={styles.tabContent}>
                    <div className={styles.comingSoon}>
                        <Video className="w-12 h-12 mb-4 text-muted-foreground" />
                        <h2>Videos coming soon!</h2>
                        <p>Wir arbeiten daran, euch bald unsere besten Video-Momente zu zeigen.</p>
                    </div>

                </TabsContent>

                <TabsContent value="audio" className={styles.tabContent}>
                    <div className={styles.comingSoon}>
                        <Music className="w-12 h-12 mb-4 text-muted-foreground" />
                        <h2>Audio coming soon!</h2>
                        <p>Bald könnt ihr hier unsere Musik hören und downloaden.</p>
                    </div>

                </TabsContent>
            </Tabs>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className={styles.dialogContent}>
                    {selectedImage !== null && galleryImages[selectedImage] && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className={styles.closeButton}
                                onClick={() => setIsDialogOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>

                            <div className={styles.fullImageContainer}>
                                <Image
                                    src={getStrapiImageUrl(galleryImages[selectedImage].image)}
                                    alt={galleryImages[selectedImage].imageTitle}
                                    width={galleryImages[selectedImage].image.width}
                                    height={galleryImages[selectedImage].image.height}

                                />
                            </div>

                            <div className={styles.imageInfo}>
                                <h2 className={styles.fullImageTitle}>
                                    {galleryImages[selectedImage].imageTitle}
                                </h2>
                                <p className={styles.fullImageDescription}>
                                    {galleryImages[selectedImage].imageDescription}
                                </p>
                                <Button
                                    onClick={() => handleDownload(galleryImages[selectedImage])}
                                    className={styles.downloadButton}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Bild herunterladen
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}