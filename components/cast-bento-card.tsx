"use client"

import { StrapiCast } from "@/app/cast/page"
import { getImageUrl } from "@/lib/strapi-url"
import Image from "next/image"


export function CastBentoCard({ castDescription, castTitle, castImage }: StrapiCast) {

    const imageUrl = getImageUrl(castImage)
    const imageAlt = castTitle

    return (
        <div className="h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg mb-0">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover/bento:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="flex-1 space-y-2 p-6 pt-4">
                <h3 className="font-semibold text-xl text-foreground">
                    {castTitle}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {castDescription}
                </p>
            </div>
        </div>
    )
}
