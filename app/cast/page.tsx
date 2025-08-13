"use client"

import { CastBentoCard } from "@/components/cast-bento-card"
import ErrorState from "@/components/custom/error-state/ErrorState"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { buildApiUrl } from "@/lib/strapi-url"
import { StrapiImage } from "@/types"
import { useEffect, useState } from "react"

function CastSkeleton() {
  return (
    <BentoGrid>
      {Array.from({ length: 4 }).map((_, i) => (
        <BentoGridItem key={i} className="min-h-[400px]">
          <Skeleton className="h-full w-full rounded-lg" />
        </BentoGridItem>
      ))}
    </BentoGrid>
  )
}

export interface StrapiCastPage {
  id: number;
  castHeading: string;
  castDescription: string;
  updatedAt: string;
  createdAt: string;
}

export interface StrapiCast {
  id: string
  castDescription: string
  castTitle: string
  castImage: StrapiImage;
  position?: number;
}

async function getCastMembers(): Promise<StrapiCast[]> {
  const url = buildApiUrl('/casts?populate=*&sort=position:asc')
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch cast members')
  const data = await response.json()
  console.log("🚀 ~ getCastMembers ~ data:", data["data"])
  return data["data"];
}

async function getCastPage(): Promise<StrapiCastPage> {
  const url = buildApiUrl('/cast-page')
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch cast page')
  const data = await response.json()
  return data["data"];
}


export default function CastPage() {
  const [castPage, setCastPage] = useState<StrapiCastPage | null>(null)
  const [castPageLoading, setCastPageLoading] = useState(true)
  const [castPageError, setCastPageError] = useState<string | null>(null)
  const [casts, setCasts] = useState<StrapiCast[]>([])
  const [castsLoading, setcastsLoading] = useState(true)
  const [castsError, setCastsError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCastPage() {
      try {
        setCastPageLoading(true)
        setCastPageError(null)
        const data = await getCastPage();
        setCastPage(data)
      } catch (err) {
        console.error("❌ Error fetching cast page:", err);
        setCastPageError('Besetzungen konnten nicht geladen werden. Bitte versuche es später erneut.')
      } finally {
        setCastPageLoading(false)
      }
    }

    fetchCastPage();
    async function fetchCastMembers() {
      try {
        setcastsLoading(true)
        setCastsError(null)
        const data = await getCastMembers()
        setCasts(data)
      } catch (err) {
        console.error("❌ Error fetching cast data:", err);
        setCastsError('Besetzungen konnten nicht geladen werden. Bitte versuche es später erneut.')
      } finally {
        setcastsLoading(false)
      }
    }

    fetchCastMembers()
  }, [])



  return (
    <div className="max-w-7xl mx-auto py-12">


      <div
        className="text-center mb-12"
      >

        {castPageLoading && <Skeleton className="h-8 w-1/2 mx-auto" />}
        {!castPageLoading && <>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {castPage?.castHeading || "Unsere Besetzungen"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {castPage?.castDescription || "Von Combo bis XXL - die Funky Marching Band in unterschiedlichen Besetzungen für jeden Anlass"}
          </p></>}
      </div>


      {castsLoading && <CastSkeleton />}

      {castsError && (
        <ErrorState
          title="Besetzungen konnten nicht geladen werden"
          message={castsError}
        />
      )}

      {!castsLoading && casts.length === 0 && (
        <ErrorState message="Keine Besetzungen gefunden"></ErrorState>
      )}

      {!castsLoading && casts.length > 0 && (
        <BentoGrid>
          {casts.map((cast, index) => {
            const tiltDirection = index % 4 === 0 || index % 4 === 3 ? 'left' : 'right'
            return (
              <BentoGridItem
                key={cast.id}
                delay={index * 0.15}
                tiltDirection={tiltDirection}
                className="min-h-[400px]"
              >
                <CastBentoCard {...cast} />
              </BentoGridItem>
            )
          })}
        </BentoGrid>
      )}
    </div>
  )
}