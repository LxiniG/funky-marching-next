import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { buildApiUrl, getImageUrl as getStrapiImageUrl } from '@/lib/strapi-url';
import { StrapiImage } from '@/types/strapi';
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './ImageTab.module.css';

interface Props { }

interface StrapiGalleryImage {
    id: number;
    imageDescription: string;
    imageDate: Date;
    imageTitle: string;
    image: StrapiImage;
    imageCopyright?: string;
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



const ImageTab: NextPage<Props> = ({ }) => {
    const [galleryImages, setGalleryImages] = useState<StrapiGalleryImage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        setIsDialogOpen(true);
    };

    const handeNextImageClick = () => {
        if (selectedImage != null) {
            const nextIndex = (selectedImage + 1) % galleryImages.length;
            setSelectedImage(nextIndex);
        }
    }

    const handlePrevImageClick = () => {
        if (selectedImage != null) {
            const prevIndex = (selectedImage - 1 + galleryImages.length) % galleryImages.length;
            setSelectedImage(prevIndex);
        }

    }

    useEffect(() => {
        const loadGalleryImages = async () => {
            try {
                const response = await fetchGalleryImages();
                setGalleryImages(response);
            } catch (err) {
                console.error('Error fetching gallery images:', err);
            }
        };
        loadGalleryImages();
    }, [])

    return <div>
        {/* Info box for clicking images */}
        <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-muted/30 border border-border rounded-lg max-w-fit mx-auto">
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
                Zum Vergrößern der Bilder anklicken
            </span>
        </div>

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
                        layout="responsive"
                        width={item.image.width}
                        height={item.image.height}
                    />
                    <div className={styles.imageOverlay}>
                        <h3 className={styles.imageCardTitle}>{item.imageTitle}</h3>
                    </div>
                </div>
            ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent title={galleryImages[selectedImage != null ? selectedImage : 0]?.imageTitle} showCloseButton={false} className="h-full min-w-full flex p-0 flex-col justify-center">
                {selectedImage !== null && galleryImages[selectedImage] && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-4 right-4 z-50 bg-background border border-border"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <div className="flex flex-center overflow-hidden justify-center">
                            <Image
                                className='block w-full h-auto object-contain'

                                src={getStrapiImageUrl(galleryImages[selectedImage].image)}
                                alt={galleryImages[selectedImage].imageTitle}
                                width={galleryImages[selectedImage].image.width}
                                height={galleryImages[selectedImage].image.height}

                            />
                        </div>

                        <div className="absolute bottom-0 p-6 text-center bg-card rounded-lg m-6 border-border">
                            <h2 className="mb-2 text-foreground">
                                {galleryImages[selectedImage].imageTitle}
                            </h2>
                            <p className="text-muted-foreground leading-6">
                                {galleryImages[selectedImage].imageDescription}
                            </p>
                            {galleryImages[selectedImage].imageCopyright && (
                                <p className="text-xs text-muted-foreground mt-2 italic">
                                    © {galleryImages[selectedImage].imageCopyright}
                                </p>
                            )}
                        </div>

                        <Button
                            onClick={handeNextImageClick}
                            variant="outline"
                            size="icon"
                            className="absolute bottom-[50vh] right-4 z-50 bg-background border border-border"
                        >
                            <ArrowRight></ArrowRight>
                        </Button>

                        <Button
                            onClick={handlePrevImageClick}
                            variant="outline"
                            size="icon"
                            className="absolute bottom-[50vh] left-4 z-50 bg-background border border-border"
                        >
                            <ArrowLeft></ArrowLeft>
                        </Button>


                    </>
                )}
            </DialogContent>
        </Dialog>
    </div>
}

export default ImageTab;