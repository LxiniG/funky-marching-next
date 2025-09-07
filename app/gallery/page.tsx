"use client";
import ErrorState from "@/components/custom/error-state/ErrorState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildApiUrl, getImageUrl as getStrapiImageUrl } from "@/lib/strapi-url";
import { StrapiAudio, StrapiImage } from "@/types/strapi";
import { Image as ImageIcon, Music, Video, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";

interface StrapiGalleryImage {
    id: number;
    imageDescription: string;
    imageDate: Date;
    imageTitle: string;
    image: StrapiImage;
    imageCopyright?: string;
}

interface StrapiGalleryAudio {
    id: number;
    audioTitle: string;
    audioDescription: string;
    audio: StrapiAudio;
    audioDate?: Date;
}

interface StrapiGalleryVideo {
    id: number;
    videoTitle: string;
    videoDescription: string;
    video: StrapiImage;
    videoDate?: Date;
    videoPoster?: StrapiImage;
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

async function fetchAudioFiles(): Promise<StrapiGalleryAudio[]> {
    const apiUrl = buildApiUrl('gallery-audios?populate=*');
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch audio files from Strapi");
    }
    const data = await response.json();
    console.log("🚀 ~ fetchAudioFiles ~ response:", data)
    return data["data"];
}

async function fetchVideoFiles(): Promise<StrapiGalleryVideo[]> {
    const apiUrl = buildApiUrl('gallery-videos?populate=*');
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch video files from Strapi");
    }
    const data = await response.json();
    console.log("🚀 ~ fetchVideoFiles ~ response:", data)
    return data["data"];
}



export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<StrapiGalleryImage[]>([]);
    const [audioFiles, setAudioFiles] = useState<StrapiGalleryAudio[]>([]);
    const [videoFiles, setVideoFiles] = useState<StrapiGalleryVideo[]>([]);
    const [videoThumbnails, setVideoThumbnails] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [audioLoading, setAudioLoading] = useState(false);
    const [videoLoading, setVideoLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioError, setAudioError] = useState<string | null>(null);
    const [videoError, setVideoError] = useState<string | null>(null);

    const generateVideoThumbnail = (videoUrl: string, videoId: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.crossOrigin = 'anonymous';
            video.currentTime = 1; // Capture frame at 1 second

            video.onloadeddata = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(thumbnail);
                } else {
                    reject('Failed to get canvas context');
                }
            };

            video.onerror = () => reject('Failed to load video');
            video.src = videoUrl;
        });
    };

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
        const loadAudioFiles = async () => {
            try {
                setAudioLoading(true);
                setAudioError(null);
                const response = await fetchAudioFiles();
                setAudioFiles(response);
            } catch (err) {
                console.error('Error fetching audio files:', err);
                setAudioError('Failed to load audio files');
            } finally {
                setAudioLoading(false);
            }
        };
        loadAudioFiles();

        const loadVideoFiles = async () => {
            try {
                setVideoLoading(true);
                setVideoError(null);
                const response = await fetchVideoFiles();
                setVideoFiles(response);

                // Generate thumbnails for videos without videoPosters
                const thumbnails: { [key: number]: string } = {};
                for (const video of response) {
                    if (!video.video) {
                        try {
                            const thumbnail = await generateVideoThumbnail(getStrapiImageUrl(video.video), video.id);
                            thumbnails[video.id] = thumbnail;
                        } catch (error) {
                            console.warn(`Failed to generate thumbnail for video ${video.id}:`, error);
                        }
                    }
                }
                setVideoThumbnails(thumbnails);
            } catch (err) {
                console.error('Error fetching video files:', err);
                setVideoError('Failed to load video files');
            } finally {
                setVideoLoading(false);
            }
        };
        loadVideoFiles();
    }, []);




    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        setIsDialogOpen(true);
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
                        Videos ({videoFiles.length})
                    </TabsTrigger>
                    <TabsTrigger value="audio" className={styles.tabsTrigger}>
                        <Music className="w-4 h-4 mr-2" />
                        Audio ({audioFiles.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="images" className={styles.tabContent}>
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
                </TabsContent>

                <TabsContent value="videos" className={styles.tabContent}>
                    {videoLoading && (
                        <div className="max-w-4xl mx-auto space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="min-h-[300px] bg-card border border-border rounded-lg">
                                    <Skeleton className="h-full w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                    )}

                    {videoError && (
                        <ErrorState message="Video-Dateien konnten nicht geladen werden." />
                    )}

                    {!videoLoading && !videoError && videoFiles.length === 0 && (
                        <div className={styles.comingSoon}>
                            <Video className="w-12 h-12 mb-4 text-muted-foreground" />
                            <h2>Keine Video-Dateien gefunden</h2>
                            <p>Momentan sind keine Video-Dateien verfügbar.</p>
                        </div>
                    )}

                    {!videoLoading && !videoError && videoFiles.length > 0 && (
                        <div className="max-w-4xl mx-auto space-y-4 m-4">
                            {videoFiles.map((video, index) => (
                                <div key={video.id} className="p-6 pt-8 bg-card border border-border rounded-lg">
                                    <video
                                        controls
                                        className="w-full mb-8 max-h-96"
                                        preload="metadata"
                                        poster={
                                            video.videoPoster
                                                ? getStrapiImageUrl(video.videoPoster)
                                                : videoThumbnails[video.id]
                                        }
                                    >
                                        <source src={getStrapiImageUrl(video.video)} type={video.video.mime} />
                                        Your browser does not support the video element.
                                    </video>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {video.videoTitle}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {video.videoDescription}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="audio" className={styles.tabContent}>
                    {audioLoading && (
                        <div className="max-w-4xl mx-auto space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="min-h-[120px] bg-card border border-border rounded-lg">
                                    <Skeleton className="h-full w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                    )}

                    {audioError && (
                        <ErrorState message="Audio-Dateien konnten nicht geladen werden." />
                    )}

                    {!audioLoading && !audioError && audioFiles.length === 0 && (
                        <div className={styles.comingSoon}>
                            <Music className="w-12 h-12 mb-4 text-muted-foreground" />
                            <h2>Keine Audio-Dateien gefunden</h2>
                            <p>Momentan sind keine Audio-Dateien verfügbar.</p>
                        </div>
                    )}

                    {!audioLoading && !audioError && audioFiles.length > 0 && (
                        <div className="max-w-4xl mx-auto space-y-4">
                            {audioFiles.map((audio, index) => (
                                <div key={audio.id} className="p-6 pt-8 bg-card border border-border rounded-lg">
                                    <audio
                                        controls
                                        className="w-full mb-8"
                                        preload="metadata"
                                    >
                                        <source src={audio.audio.url} type={audio.audio.mime} />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {audio.audioTitle}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {audio.audioDescription}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                                {galleryImages[selectedImage].imageCopyright && (
                                    <p className="text-xs text-muted-foreground mt-2 italic">
                                        © {galleryImages[selectedImage].imageCopyright}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}