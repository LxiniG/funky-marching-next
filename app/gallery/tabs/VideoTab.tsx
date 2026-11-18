import { Skeleton } from "@/components/ui/skeleton";
import { buildApiUrl, getImageUrl } from "@/lib/strapi-url";
import { useEffect, useState } from "react";

interface StrapiGalleryYouTubeIntegratedVideo {
    id: number;
    videoTitle?: string;
    videoUrl: string;
    videoDescription?: string;
    videoDate?: Date;
    videoThumbnail?: { url: string } | null;
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
    const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
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
                    <div key={index} className="space-y-3">
                        <Skeleton className="w-full aspect-video rounded-xl" />
                        <div className="px-2 space-y-2">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
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

    function getYouTubeVideoId(url: string): string | null {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        return match?.[1] ?? null;
    }

    function getYouTubeEmbedUrl(url: string): string {
        const videoId = getYouTubeVideoId(url);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start w-full gap-6 max-w-6xl mx-auto p-4 my-8">
            {videos.map((video) => {
                const videoId = getYouTubeVideoId(video.videoUrl);
                const thumbnailUrl = video.videoThumbnail
                    ? getImageUrl(video.videoThumbnail)
                    : videoId
                        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                        : null;

                return (
                    <div key={video.id} className="min-w-0">
                        {activeVideoId === video.id || !thumbnailUrl ? (
                            <iframe
                                src={getYouTubeEmbedUrl(video.videoUrl)}
                                className="w-full aspect-video rounded-xl"
                                title={video.videoTitle || "Video"}
                                allowFullScreen
                                loading="lazy"
                            />
                        ) : (
                            <button
                                type="button"
                                className="relative block w-full aspect-video overflow-hidden rounded-xl bg-muted"
                                onClick={() => setActiveVideoId(video.id)}
                                aria-label={`Video abspielen: ${video.videoTitle || "Video"}`}
                            >
                                <img
                                    src={thumbnailUrl}
                                    alt={video.videoTitle || "Video-Vorschaubild"}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-white">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="ml-1 h-10 w-10 drop-shadow-lg"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M7.2 4.7a1.7 1.7 0 0 0-2.6 1.45v11.7a1.7 1.7 0 0 0 2.6 1.45l10.1-5.85a1.7 1.7 0 0 0 0-2.9L7.2 4.7Z" />
                                    </svg>
                                </span>
                            </button>
                        )}

                        <div className="space-y-2 px-2 py-4">
                            {video.videoTitle && (
                                <h2
                                    className="text-2xl font-semibold text-foreground text-left"
                                >
                                    {video.videoTitle}
                                </h2>
                            )}
                            {video.videoDescription && (
                                <p
                                    className="text-xs leading-relaxed text-muted-foreground text-left"
                                >
                                    {video.videoDescription}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}