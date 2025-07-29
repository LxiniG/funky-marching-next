import { StrapiImage } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiImageUrl(image: StrapiImage, baseUrl?: string): string | null {
  if (!image?.data?.attributes?.url) return null;

  const imageUrl = image.data.attributes.url;
  const strapiBaseUrl = baseUrl || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

  // If URL is already absolute, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Otherwise, prepend Strapi base URL
  return `${strapiBaseUrl}${imageUrl}`;
}

export function getStrapiImageAlt(image: StrapiImage, fallback: string = ''): string {
  return image?.data?.attributes?.alternativeText || fallback;
}
