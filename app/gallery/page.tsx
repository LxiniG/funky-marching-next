"use client";
import ErrorState from "@/components/custom/error-state/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildApiUrl } from "@/lib/strapi-url";
import { StrapiAudio } from "@/types/strapi";
import { Image as ImageIcon, Music, Video } from "lucide-react";
import { useEffect, useState } from "react";
// Using Tailwind utilities instead of Gallery.module.css
import ImageTab from "./tabs/ImageTab";
import VideoTab from "./tabs/VideoTab";



interface StrapiGalleryAudio {
    id: number;
    audioTitle: string;
    audioDescription: string;
    audio: StrapiAudio;
    audioDate?: Date;
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

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [audioFiles, setAudioFiles] = useState<StrapiGalleryAudio[]>([]);
    const [loading, setLoading] = useState(true);
    const [audioLoading, setAudioLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioError, setAudioError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);




    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        setIsDialogOpen(true);
    };

    return (

        <div className="flex flex-col w-full max-w-[1000px] items-center justify-center mt-[60px] mx-auto pb-[60px] relative z-10">
            <h1 className="text-2xl font-bold">Galerie</h1>
            <p className="p-[0.3rem] text-center text-muted-foreground mb-8 max-w-[600px] mx-auto">
                Bilder, Audios und Videos von unseren Gigs und Aufnahmen.
            </p>

            {error && (
                <ErrorState message="Bilder konnten nicht geladen werden."></ErrorState>
            )}

            <Tabs defaultValue="videos" className="w-full flex flex-col items-center">
                <TabsList className="flex justify-center mb-12 bg-muted rounded-[12px] p-[6px] h-[60px] items-center">
                    <TabsTrigger value="images" className="flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-200 h-[48px]">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Bilder
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-200 h-[48px]">
                        <Video className="w-4 h-4 mr-2" />
                        Videos
                    </TabsTrigger>
                    <TabsTrigger value="audio" className="flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-200 h-[48px]">
                        <Music className="w-4 h-4 mr-2" />
                        Audio
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="images" className="min-h-[400px] w-full">
                    <ImageTab />
                </TabsContent>

                <TabsContent value="videos" className="min-h-[400px] w-full">
                    <VideoTab></VideoTab>
                </TabsContent>

                <TabsContent value="audio" className="min-h-[400px] w-full">
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
                        <div className="flex flex-col items-center justify-center text-center min-h-[400px] text-muted-foreground">
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
        </div>
    );
}