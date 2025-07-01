import { NextPage } from 'next'
import styles from "./Cast.module.css";

interface Props { }

const casts = [
  {
    name: "FMB Combo",
    img: "/fmb-casts/combo.jpg",
    description: "Die Funky Marching Band Combo spielt mit 9-10 Musikern für kleine Anlässe und Konzerte akustisch, mobil und beweglich oder auf der Bühne verstärkt. Besetzung: Trompete, 3 Saxophone, Posaune, Sousaphon, Gitarre, Snare, Basstrommel und Sänger"
  },
  {
    name: "FMB Funuralband",
    img: "/fmb-casts/funuralband.jpg",
    description: "Eine Funuralband wie aus der Zeit um 1910-1930. Gibt es so etwas? Bei uns schon. Die Band spielt bei Hochzeiten und Beerdigungen. Besetzung: Trompete, 3 Saxophone, Posaune, Tuba/Sousaphon, Gitarre, Snare, Basstrommel und Sänger"
  },
  {
    name: "FMB XL",
    img: "/fmb-casts/xl.jpg",
    description: "Die Funky Marching Band - Standardbesetzung mit ca. 13-16 Teilnehmern ist einsetzbar für jeden Anlass wie: Straßen- und Firmenfeste, Einweihungen, Walking Acts, Tanzabende, Taufen, Hochzeiten und viele mehr. Besetzung: 1-2 Trompeten, 3-4 Saxophone, 1-2 Posaunen, 1-2 Tuben/Sousaphone, Gitarre, Snare, Basstrommel und Sänger"
  },
  {
    name: "FMB XXL",
    img: "/fmb-casts/xxl.jpg",
    description: "Funky Marching Bands größte Besetzung ist mit 20-30 Musikern mobil unterwegs. Für große Anlässe, überall dort, wo es um Lautstärke und Power geht für ein großes Publikum. Besetzung: 2-4 Trompeten, 4-6 Saxophone, 2-3 Posaunen, 2-3 Tuben, 1-2 Sousaphone, Gitarre, Snare, Basstrommel und Sänger",
  },
];

const Page: NextPage<Props> = ({ }) => {
  return (
    <div className={styles.castsPage}>
      <h1 className={styles.castsTitle}>Unsere Besetzungen</h1>
      <div className={styles.castsGrid}>
        {casts.map((cast) => (
          <div className={styles.castCard} key={cast.name}>
            <img src={cast.img} alt={cast.name} className={styles.castImg} />
            <h2 className={styles.castName}>{cast.name}</h2>
            <p className={styles.castDesc}>{cast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page