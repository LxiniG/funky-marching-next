"use client";
import { useState } from "react";
import styles from "./Gallery.module.css";
import Image from "next/image";

const photoList = [
    {
        src: "/fmb-gallery/PHOTO-2023-07-02-00-06-04.jpg",
        title: "FMB Opening Night",
        description: "Die Band startet die Saison mit einem energiegeladenen Auftritt."
    },
    {
        src: "/fmb-gallery/PHOTO-2023-07-02-22-36-17.jpg",
        title: "Sommerkonzert",
        description: "Ein sonniger Tag voller Musik und guter Laune."
    },
    {
        src: "/fmb-gallery/PHOTO-2023-07-02-22-36-19.jpg",
        title: "Publikum begeistert",
        description: "Das Publikum feiert die FMB beim Stadtfest."
    },
    {
        src: "/fmb-gallery/PHOTO-2023-07-13-08-53-25.jpg",
        title: "Marching Groove",
        description: "Die Band marschiert durch die Straßen von Freiburg."
    },
    {
        src: "/fmb-gallery/PHOTO-2023-09-24-14-13-31.jpg",
        title: "Open Air Bühne",
        description: "FMB auf der großen Open-Air-Bühne."
    },
    {
        src: "/fmb-gallery/PHOTO-2024-06-22-07-06-42.jpg",
        title: "Frühsommer Gig",
        description: "Ein Auftritt am frühen Morgen im Juni."
    },
    {
        src: "/fmb-gallery/PHOTO-2024-06-30-21-59-49.jpg",
        title: "Abendstimmung",
        description: "Die Band spielt in den Sonnenuntergang."
    },
    {
        src: "/fmb-gallery/PHOTO-2024-07-20-10-00-28.jpg",
        title: "Festival-Highlight",
        description: "FMB als Headliner beim Sommerfestival."
    },
    {
        src: "/fmb-gallery/PHOTO-2024-10-13-21-57-30.jpg",
        title: "Herbstkonzert",
        description: "Ein stimmungsvoller Auftritt im Oktober."
    },
    {
        src: "/fmb-gallery/PHOTO-2024-10-13-21-57-31.jpg",
        title: "Band im Fokus",
        description: "Ein besonderer Moment auf der Bühne."
    },
    {
        src: "/fmb-gallery/PHOTO-2024-12-19-20-15-25.jpg",
        title: "Wintergig",
        description: "FMB bringt Schwung in die kalte Jahreszeit."
    },
    {
        src: "/fmb-gallery/PHOTO-2025-01-11-10-26-56.jpg",
        title: "Neujahrskonzert",
        description: "Das Jahr beginnt mit Musik und Freude."
    },
    {
        src: "/fmb-gallery/PHOTO-2025-05-07-19-40-26.jpg",
        title: "Mai-Session",
        description: "Ein spontaner Auftritt im Mai."
    },
    {
        src: "/fmb-gallery/PHOTO-2025-05-24-18-18-13.jpg",
        title: "Open Stage",
        description: "FMB lädt zum Mitmachen ein."
    },
    {
        src: "/fmb-gallery/PHOTO-2025-05-24-18-18-13 2.jpg",
        title: "Publikumsliebling",
        description: "Die Band begeistert Jung und Alt."
    },
    {
        src: "/fmb-gallery/PHOTO-2025-05-24-18-18-13 3.jpg",
        title: "Finale",
        description: "Der letzte Song des Abends."
    },
];

export default function GalleryPage() {
    const [mode, setMode] = useState<'photos' | 'videos'>("photos");
    const [selected, setSelected] = useState(0);

    return (
        <div className={styles.galleryPage}>
            <div
                className={styles.bgBlur}
                style={{
                    backgroundImage: `url(${photoList[selected].src})`,
                }}
                aria-hidden="true"
            />
            <div className={
                mode === "videos"
                    ? styles.sliderBox + " " + styles.videos
                    : styles.sliderBox
            }>
                <button
                    className={mode === "photos" ? styles.active : ""}
                    onClick={() => setMode("photos")}
                >
                    Fotos
                </button>
                <button
                    className={mode === "videos" ? styles.active : ""}
                    onClick={() => setMode("videos")}
                >
                    Videos
                </button>
            </div>
            {mode === "photos" && (
                <div className={styles.galleryContent}>
                    <div className={styles.bigImageBox}>
                        <Image
                            src={photoList[selected].src}
                            alt={photoList[selected].title}
                            width={600}
                            height={400}
                            className={styles.bigImage}
                            priority
                        />
                        <div className={styles.imageTextBox}>
                            <h2 className={styles.imageTitle}>{photoList[selected].title}</h2>
                            <p className={styles.imageDesc}>{photoList[selected].description}</p>
                        </div>
                    </div>
                    <div className={styles.previewList}>
                        {photoList.map((img, i) => (
                            <div
                                key={img.src}
                                className={
                                    i === selected
                                        ? styles.preview + " " + styles.selected
                                        : styles.preview
                                }
                                onClick={() => setSelected(i)}
                            >
                                <Image
                                    src={img.src}
                                    alt={`Preview ${i + 1}`}
                                    width={90}
                                    height={60}
                                    className={styles.previewImg}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {mode === "videos" && (
                <div className={styles.comingSoon}>Videos coming soon!</div>
            )}
        </div>
    );
}
