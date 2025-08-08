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

export interface StrapiCast {
  id: string
  castDescription: string
  castTitle: string
  castImage: StrapiImage;
}

export interface StrapiResponse {
  data: StrapiCast[];
}

async function getCastMembers(): Promise<StrapiResponse> {
  const url = buildApiUrl('/casts?populate=*')
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch cast members')
  const data = await response.json()
  console.log("🚀 ~ getCastMembers ~ data:", data)
  return data;
}

export default function CastPage() {
  const [casts, setCasts] = useState<StrapiCast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCastMembers() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCastMembers()
        setCasts(data.data)
      } catch (err) {
        console.error("❌ Error fetching cast data:", error);
        setError('Besetzungen konnten nicht geladen werden. Bitte versuche es später erneut.')
      } finally {
        setLoading(false)
      }
    }

    fetchCastMembers()
  }, [])

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    getCastMembers()
      .then(data => {
        setCasts(data.data);
      })
      .catch(err => {
        console.log('Retry failed, using static data')
        setError("Besetzungen konnten nicht geladen werden. Bitte versuche es später erneut.")
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Unsere Besetzungen
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Von Combo bis XXL - die Funky Marching Band in verschiedenen Besetzungen für jeden Anlass
        </p>
      </div>


      {loading && <CastSkeleton />}

      {error && (
        <ErrorState
          title="Besetzungen konnten nicht geladen werden"
          message={error}
          onRetry={handleRetry}
        />
      )}

      {!loading && casts.length === 0 && (
        <ErrorState message="Keine Besetzungen gefunden"></ErrorState>
      )}

      {!loading && casts.length > 0 && (
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