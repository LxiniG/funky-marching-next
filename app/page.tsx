"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Gig, StrapiGigResponse, StrapiImage } from '@/types';
import Image from "next/image";
import { useEffect, useState } from "react";
import BackToTopButton from "./components/BackToTopButton";
import NextGigBanner from "./components/NextGigBanner";
import PagePreview from "./components/PagePreview";

const pages = [
  {
    title: "Gigs",
    description: "Hier finden Sie alle unsere kommenden Auftritte.",
    imageUrl: "/gig-images/img-1.jpg",
    linkUrl: "/gigs",
  },
  {
    title: "Besetzung",
    description: "Die Funky Marching Band von Funuralband bix XXL!",
    imageUrl: "/gig-images/img-2.jpg",
    linkUrl: "/cast",
  },
  {
    title: "Bandleader",
    description: "Über unseren Bandleader Jörgen Welander",
    imageUrl: "/bandleader-img.jpg",
    linkUrl: "/bandleader",
  },
  {
    title: "Galerie",
    description: "Bilder, Videos und Audios von der FMB in Action!",
    imageUrl: "/gig-images/img-5.png",
    linkUrl: "/impressum",
  },
  {
    title: "Kontakt",
    description: "Kontakt zur FMB und Proben",
    imageUrl: "/gig-images/img-6.jpg",
    linkUrl: "/contact",
  },
  {
    title: "Impressum",
    description: "Impressum und rechtliche Hinweise",
    imageUrl: "/gig-images/img-7.jpg",
    linkUrl: "/impressum",
  },
];

interface StrapiAboutUsPageResponse {
  data: {
    id: string;
    documentId: string;
    aboutUsQuote: string;
    aboutUsText: string;
    aboutUsHistory: string;
    titlePhoto: StrapiImage;
  };

}

interface AboutUsPageData {
  id: string;
  documentId: string;
  aboutUsQuote: string;
  aboutUsText: string;
  aboutUsHistory: string;
  titlePhoto: StrapiImage;
}

async function getNextGig(): Promise<StrapiGigResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const api = `/api/gigs?filters[gigStartDate][$gte]=${todayISO}&sort=gigStartDate:asc&pagination[limit]=1`;

  const url = new URL(api, baseUrl)
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch next gig from Strapi");
  }

  const data = await res.json();
  console.log("🚀 ~ getNextGig ~ data:", data)
  return data;
}

async function getAboutUsData(): Promise<StrapiAboutUsPageResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';
  const api = '/api/about-us-page?populate=*';

  const url = new URL(api, baseUrl);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch about us data from Strapi");
  }

  const data = await res.json();
  console.log("🚀 ~ getAboutUsData ~ data:", data);
  return data;
}

export default function Home() {
  const [rotate, setRotate] = useState({ x: 5, y: 5 });
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [nextGig, setNextGig] = useState<Gig | null>(null);
  const [isGigLoading, setIsGigLoading] = useState(true);
  const [gigError, setGigError] = useState<string | null>(null);
  const [aboutUsData, setAboutUsData] = useState<AboutUsPageData | null>(null);
  const [isAboutUsLoading, setIsAboutUsLoading] = useState(true);
  const [aboutUsError, setIsAboutUsError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 AboutUs useEffect triggered');
    const fetchAboutUsData = async () => {
      try {
        console.log('🚀 Starting to fetch about us data...');
        setIsAboutUsLoading(true);
        const strapiData = await getAboutUsData();
        console.log('🚀 Received about us data:', strapiData);
        const mappedData: AboutUsPageData = {
          id: strapiData.data.id,
          documentId: strapiData.data.documentId,
          aboutUsQuote: strapiData.data.aboutUsQuote,
          aboutUsText: strapiData.data.aboutUsText,
          aboutUsHistory: strapiData.data.aboutUsHistory,
          titlePhoto: strapiData.data.titlePhoto,
        };
        console.log('🚀 Mapped about us data:', mappedData);
        setAboutUsData(mappedData);
      } catch (error) {
        console.error("❌ Error fetching about us data:", error);
        setIsAboutUsError("Failed to load about us data");
      } finally {
        setIsAboutUsLoading(true);
      }
    };

    fetchAboutUsData();
  }, []);

  useEffect(() => {
    console.log('🚀 Gigs useEffect triggered');
    const fetchNextGig = async () => {
      try {
        console.log('🚀 Starting to fetch next gig...');
        setIsGigLoading(true);
        const strapiData = await getNextGig();
        console.log('🚀 Received gig data:', strapiData);
        if (strapiData.data && strapiData.data.length > 0) {
          const gigData = strapiData.data[0];
          const mappedGig: Gig = {
            gigStartDate: new Date(gigData.gigStartDate),
            gigTitle: gigData.gigTitle,
            gigLocation: gigData.gigLocation,
            gigLink: gigData.gigLink
          };
          console.log('🚀 Mapped gig data:', mappedGig);
          setNextGig(mappedGig);
        } else {
          console.log('🚀 No gigs found');
        }
      } catch (err) {
        console.error('❌ Error fetching next gig:', err);
        setGigError('Failed to load next gig');
      } finally {
        setIsGigLoading(false);
      }
    };

    fetchNextGig();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 100;
      setIsBannerVisible(!bottom);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 3;
    const rotateY = ((x - centerX) / centerX) * -3;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 5, y: 5 });
  };

  return (
    <>
      {/* Always show the gig banner if data is available */}
      {!isGigLoading && !gigError && nextGig && (
        <NextGigBanner
          isVisible={isBannerVisible}
          gig={nextGig}
        />
      )}

      {/* Show loading skeleton for about us */}
      {isAboutUsLoading && (
        <div className="scroll-section section-1" id="section1">
          <div className="blue-hue-circle"></div>
          <div className="flex flex-col items-center space-y-8 p-8">
            {/* Image skeleton */}
            <Skeleton className="h-[500px] w-[500px] rounded-xl" />
            {/* Title skeleton */}
            <Skeleton className="h-12 w-[600px]" />
          </div>
          {/* About us section skeleton */}
          <div className="scroll-section about-us-section">
            <div className="flex gap-8 p-8">
              {/* About us card 1 skeleton */}
              <div className="flex-1 space-y-4 p-6">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              {/* About us card 2 skeleton */}
              <div className="flex-1 space-y-4 p-6">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show error state for about us */}
      {aboutUsError && (
        <div className="scroll-section section-1" id="section1">
          <div className="blue-hue-circle"></div>
          <h1>Error: {aboutUsError}</h1>
        </div>
      )}

      {/* Show content when about us data is loaded */}
      {!isAboutUsLoading && !aboutUsError && aboutUsData && (
        <div>
          <div className="scroll-section section-1" id="section1">
            <div className="blue-hue-circle"></div>
            <Image
              src="/gig-images/img-4.jpg"
              alt="Gig Image 1"
              width={1000}
              height={1000}
              quality={100}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
            <h1>{aboutUsData.aboutUsQuote}</h1>
          </div>
          <div className="scroll-section about-us-section" id="about-us">
            <div
              className="about-us-card"
              style={{
                transform: `perspective(1000px) rotateX(-3deg) rotateY(3deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <h2>Über uns</h2>
              <p>
                {aboutUsData.aboutUsText}
              </p>
            </div>
            <div
              className="about-us-card"
              style={{
                transform: `perspective(1000px) rotateX(3deg) rotateY(-3deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <h2>Geschichte</h2>
              <p>
                {aboutUsData.aboutUsHistory}
              </p>
            </div>
          </div>
          <div className="scroll-section newsletter" id="newsletter">
            <div className="newsletter-bento-box">
              <h2>Sie möchten kein wichtiges Konzert verpassen?</h2>
              <p>Hier können Sie unseren Newsletter abonnieren</p>
              <div className="newsletter-form">
                <input type="email" placeholder="E-Mail Adresse" />
                <button>Abonnieren</button>
              </div>
              <div className="blue-drop"></div>
            </div>
          </div>
          <div className="scroll-section more-pages-section" id="more-pages">
            <div className="preview-row">
              {[...pages, ...pages, ...pages].map((page, index) => (
                <PagePreview
                  key={index}
                  title={page.title}
                  description={page.description}
                  imageUrl={page.imageUrl}
                  linkUrl={page.linkUrl}
                />
              ))}
            </div>
          </div>
          <BackToTopButton />
        </div>


      )}

    </>
  );
}
