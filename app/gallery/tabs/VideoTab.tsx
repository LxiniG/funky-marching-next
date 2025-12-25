import { Skeleton } from "@/components/ui/skeleton";
import { buildApiUrl } from "@/lib/strapi-url";
import { useEffect, useState } from "react";

interface StrapiGalleryYouTubeIntegratedVideo {
    id: number;
    videoTitle?: string;
    videoUrl: string;
    videoDescription?: string;
    videoDate?: Date;
}

async function fetchVideoFiles(): Promise<StrapiGalleryYouTubeIntegratedVideo[]> {
    const apiUrl = buildApiUrl('gallery-you-tube-integrated-videos?populate=*');
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch video files from Strapi");
    }
    const data = await response.json();
    console.log("🚀 ~ fetchVideoFiles ~ response:", data)
    return data["data"];
}

export default function VideoTab() {
    const [videos, setVideos] = useState<StrapiGalleryYouTubeIntegratedVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVideos = async () => {
            try {
                setLoading(true);
                const videoData = await fetchVideoFiles();
                console.log("🚀 ~ loadVideos ~ videoData:", videoData);
                setVideos(videoData);
            } catch (err) {
                console.error("❌ Error fetching videos:", err);
                setError("Failed to load videos. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadVideos();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="p-4 bg-card border border-border rounded-lg">
                        <Skeleton className="w-full h-40 mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (videos.length === 0) {
        return <p className="text-center text-muted-foreground">Keine Videos verfügbar.</p>;
    }

    function getYouTubeEmbedUrl(url: string): string {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }

    return (
        <div className="flex flex-col items-center w-full gap-15 my-8">
            {videos.map((video) => (
                <div key={video.id} className="w-full">
                    <div className="bg-card border border-border rounded-lg flex flex-col items-center pb-4 gap-2">
                        <div className="w-full" style={{ maxWidth: '100%' }}>
                            <iframe
                                src={getYouTubeEmbedUrl(video.videoUrl)}
                                className="rounded-lg overflow-hidden w-full"
                                style={{ aspectRatio: '16 / 9' }}
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="w-full p-4">
                            {video.videoTitle && (
                                <h2 className="text-lg font-semibold text-foreground mt-2 text-center">
                                    {video.videoTitle}
                                </h2>
                            )}
                            {video.videoDescription && (
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    {video.videoDescription}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}