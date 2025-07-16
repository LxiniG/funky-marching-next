"use client";
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

export default function Home() {
  const [rotate, setRotate] = useState({ x: 5, y: 5 });
  const [isBannerVisible, setIsBannerVisible] = useState(true);

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
        <h1>„Where ever you want some funk - we'll come and play!"</h1>

        <NextGigBanner isVisible={isBannerVisible}></NextGigBanner>
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
            Ob auf der Strasse oder im Konzertsaal, die Funk-, Jazz-, Blues- und
            Latinrhythmen der FUNKY MARCHING BAND poppen an den verschiedensten
            Orten auf; ob im Jazzhaus, dem SC-Stadion, auf Festivals und selbst
            vor dem Friedhof machen sie nicht halt, denn ihre Musik begleitet in
            alter New-Orleans-Tradition die Menschen in wirklich allen
            Lebenslagen. Jörgen Welander leitet die FUNKY MARCHING BAND, deren
            rund 22 Mitglieder in den Jazz & Rock Schulen und der Musikschule
            Freiburg zu Hause sind. Die Band tritt in kleiner,
            „kammermusikalischer-Sousafunk-Besetzung“ aber auch in Großbesetzung
            auf. Energiegeladene Musik - von der Softballade bis zur Powerrakete.
            Die FUNKY MARCHING BAND greift den Stil von Brass Bands wie der
            Dirty Dozen BB (USA), der Mardi Gras BB (Deutschland) oder von
            FunkOff (Italy) auf. In traditioneller Besetzung (Sousaphone/Tuba,
            Snare, Basedrum, Saxophones, Trombone, Trumpet, Guitar, Vocals) aber
            dennoch in moderner Stilrichtung bietet die FUNKY MARCHING BAND einen
            abwechslungsreichen Auftritt mit klassischen Sounds aus New Orleans
            bis zu groovigem Funk.
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
            Marching Bands entstanden nach dem Ende des amerikanischen
            Bürgerkriegs (1865), als Afroamerikaner bei Auflösung der Armee
            günstig Instrumente kaufen konnten. Daraus entwickelte sich zunächst
            der „archaische Jazz“, eine Vorform des klassischen Jazz.
            Eine der frühen Gruppen warb mit: „Allen´s Brass Band – für alle
            Anlässe: Beerdigungen, Picknicks und Paraden“. Musikalisch haben
            sich die Street Bands in den Jahrzehnten vielfältig weiter
            entwickelt,  aber es bleibt dabei, dass sie Musik für alle Anlässe
            bieten.
            Das Repertoire von Street Bands bestand zunächst aus Spirituals,
            Blues, Songs, Ragtime, Marschmusik und Oldtime Jazz. Während der
            1990er Jahre entwickelte sich ein alternativer „Sousaphunk“ - ein
            funky Style. Sousaphone und Tuba spielen die Basslinie wie im Jazz,
            R&B und im Funk. Auch die Schlagzeuger (Snare und Basstrommel) und
            die Bläser lehnen sich an diesen Stil an.
            Anders als Big Bands spielen die Marching Bands alles auswendig. So
            lässt  sich spielend durch die Straßen und Feste ziehen. Bekannt sind
            die Street Bands aus New Orleans wie die Dirty Dozen Brass Band
            (Gründung 1979), aber auch europäische Gruppen wir die Mardi Gras
            Brass Band aus Deutschland oder FunkOff aus Italien.
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
    </>
  );
}
