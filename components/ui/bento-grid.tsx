"use client"

import { cn } from "@/lib/utils"

interface BentoGridProps {
    children: React.ReactNode
    className?: string
}

interface BentoGridItemProps {
    children: React.ReactNode
    className?: string
    delay?: number
    tiltDirection?: 'left' | 'right' | 'none'
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto px-4",
            className
        )}>
            {children}
        </div>
    )
}

export function BentoGridItem({
    children,
    className,
    tiltDirection = 'none'
}: BentoGridItemProps) {
    return (
        <div
            className={cn(
                "relative row-span-1 rounded-xl group/bento transition-all duration-300 shadow-input dark:shadow-none overflow-hidden bg-card/80 justify-between flex flex-col cursor-pointer",
                "border border-border hover:border-white",
                "hover:-translate-y-2 hover:shadow-2xl",
                className
            )}
        >
            <div className="relative z-10 flex flex-col h-full">
                {children}
            </div>
        </div>
    )
}
