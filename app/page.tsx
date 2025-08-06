"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { buildApiUrl, getImageUrl as getStrapiImageUrl } from '@/lib/strapi-url';
import { Gig, StrapiGigResponse, StrapiImage } from '@/types';
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BackToTopButton from "./components/BackToTopButton";
import ErrorState from "./components/ErrorState";
import LoadingScreen from "./components/LoadingScreen";
import NextGigBanner from "./components/NextGigBanner";
import PagePreview from "./components/PagePreview";

const pages = [
  {
    title: "Gigs",
    description: "Hier finden Sie alle unsere kommenden Auftritte.",
    linkUrl: "/gigs",
  },
  {
    title: "Besetzung",
    description: "Die Funky Marching Band von Funuralband bix XXL!",
    linkUrl: "/cast",
  },
  {
    title: "Bandleader",
    description: "Über unseren Bandleader Jörgen Welander",
    linkUrl: "/band-leader",
  },
  {
    title: "Galerie",
    description: "Bilder, Videos und Audios von der FMB in Action!",
    linkUrl: "/impressum",
  },
  {
    title: "Kontakt",
    description: "Kontakt zur FMB und Proben",
    linkUrl: "/contact",
  },
  {
    title: "Presse",
    description: "Presseanfragen und Medienkontakte",
    linkUrl: "/press",
  },
  {
    title: "Impressum",
    description: "Impressum und rechtliche Hinweise",
    linkUrl: "/impressum",
  },
];

interface AboutUsPageData {
  id: string;
  documentId: string;
  aboutUsQuote: string;
  aboutUsText: string;
  aboutUsHistory: string;
  titlePhoto: StrapiImage;
  impressumImage: StrapiImage;
  gigsImage: StrapiImage;
  bandleaderImage: StrapiImage;
  galleryImage: StrapiImage;
  contactImage: StrapiImage;
  castImage: StrapiImage;
}

async function getNextGig(): Promise<StrapiGigResponse> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const apiUrl = buildApiUrl(`gigs?filters[gigStartDate][$gte]=${todayISO}&sort=gigStartDate:asc&pagination[limit]=1`);
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch next gig from Strapi");
  }

  const data = await res.json();
  console.log("🚀 ~ getNextGig ~ data:", data)
  return data;
}

async function getAboutUsData(): Promise<any> {
  const apiUrl = buildApiUrl('about-us-page?populate=*');
  const res = await fetch(apiUrl);

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
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // Newsletter form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
          impressumImage: strapiData.data.impressumImage,
          gigsImage: strapiData.data.gigsImage,
          bandleaderImage: strapiData.data.bandleaderImage,
          galleryImage: strapiData.data.galleryImage,
          contactImage: strapiData.data.contactImage,
          castImage: strapiData.data.castImage

        };
        console.log('🚀 Mapped about us data:', mappedData);
        setAboutUsData(mappedData);
      } catch (error) {
        console.error("❌ Error fetching about us data:", error);
        setIsAboutUsError("Failed to load about us data");
      } finally {
        setIsAboutUsLoading(false);
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("Bitte fülle alle Felder aus.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    console.log('Newsletter subscription:', { firstName, lastName, email });

    toast.success(`Boom, ${firstName}! Du hast dich erfolgreich für unseren Newsletter angemeldet.`, {
      description: "Die Bestätigungsmail ist unterwegs.",
      duration: 5000,
    });

    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  const handleRetryAboutUs = () => {
    setIsAboutUsError(null);
    setIsAboutUsLoading(true);

    const fetchAboutUsData = async () => {
      try {
        console.log('🚀 Retrying about us data fetch...');
        const strapiData = await getAboutUsData();
        const mappedData: AboutUsPageData = {
          id: strapiData.data.id,
          documentId: strapiData.data.documentId,
          aboutUsQuote: strapiData.data.aboutUsQuote,
          aboutUsText: strapiData.data.aboutUsText,
          aboutUsHistory: strapiData.data.aboutUsHistory,
          titlePhoto: strapiData.data.titlePhoto,
          impressumImage: strapiData.data.impressumImage,
          gigsImage: strapiData.data.gigsImage,
          bandleaderImage: strapiData.data.bandleaderImage,
          galleryImage: strapiData.data.galleryImage,
          contactImage: strapiData.data.contactImage,
          castImage: strapiData.data.castImage
        };
        setAboutUsData(mappedData);
      } catch (error) {
        console.error("❌ Error retrying about us data:", error);
        setIsAboutUsError("Failed to load about us data");
      } finally {
        setIsAboutUsLoading(false);
      }
    };

    fetchAboutUsData();
  };

  // Function to get the appropriate Strapi image for each page
  const getStrapiImageForPage = (pageTitle: string): string => {
    if (!aboutUsData) return "";

    switch (pageTitle) {
      case "Gigs":
        return getStrapiImageUrl(aboutUsData.gigsImage);
      case "Besetzung":
        return getStrapiImageUrl(aboutUsData.castImage);
      case "Bandleader":
        return getStrapiImageUrl(aboutUsData.bandleaderImage);
      case "Galerie":
        return getStrapiImageUrl(aboutUsData.galleryImage);
      case "Kontakt":
        return getStrapiImageUrl(aboutUsData.contactImage);
      case "Presse":
        return getStrapiImageUrl(aboutUsData.impressumImage); // Using impressum image as fallback for press
      case "Impressum":
        return getStrapiImageUrl(aboutUsData.impressumImage);
      default:
        return getStrapiImageUrl(aboutUsData.impressumImage); // Default fallback
    }
  };  // Check if all loading is complete
  const isAllDataLoaded = !isAboutUsLoading && !isGigLoading;

  return (
    <>
      {showLoadingScreen && <LoadingScreen isLoading={!isAllDataLoaded} onAnimationComplete={handleLoadingComplete} />}

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
            <Skeleton className="h-[300px] w-[min(90vw,800px)] md:h-[500px] rounded-[50px]" />
            {/* Title skeleton */}
            <Skeleton className="h-12 w-[min(90vw,600px)]" />
          </div>
        </div>

      )}

      {/* Show error state for about us */}
      {aboutUsError && (
        <div className="scroll-section section-1" id="section1">
          <div className="blue-hue-circle"></div>
          <ErrorState
            title="Hauptseite konnte nicht geladen werden"
            message="Es gab ein Problem beim Laden der Hauptseiten-Daten. Bitte versuche es später erneut."
            onRetry={handleRetryAboutUs}
          />
        </div>
      )}

      {/* Show content when about us data is loaded */}
      {!isAboutUsLoading && !aboutUsError && aboutUsData && (
        <div>
          <div className="scroll-section section-1" id="section1">
            <div className="blue-hue-circle"></div>
            <Image
              src={getStrapiImageUrl(aboutUsData.titlePhoto)}
              alt={aboutUsData.titlePhoto.alternativeText || "Landing Page Image"}
              width={aboutUsData.titlePhoto.width}
              height={aboutUsData.titlePhoto.height}
              quality={100}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                maxWidth: "min(90vw, 1200px)",
                height: "auto",
                borderRadius: "50px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
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
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="newsletter-name-fields">
                  <Input
                    type="text"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email hier eingeben"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="mt-5">Abonnieren</Button>
              </form>
              <div className="blue-drop"></div>
            </div>
          </div>
          <div className="more-pages-section">
            <div className="flex items-center justify-center mb-8">
              <h2 >Hier geht's weiter..</h2>
              <ArrowUpRight className="h-2 w-2 sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-8 lg:w-8 ml-2" />
            </div>

            <div className="scroll-section">
              <div className="preview-row">
                {[...pages, ...pages, ...pages].map((page, index) => (
                  <PagePreview
                    key={index}
                    title={page.title}
                    description={page.description}
                    imageUrl={getStrapiImageForPage(page.title)}
                    linkUrl={page.linkUrl}
                  />
                ))}
              </div>
            </div>
          </div>

          <BackToTopButton />
        </div>


      )}

      <Toaster />
    </>
  );
}
