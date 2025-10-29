import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export interface TestimonialAuthor {
  name: string
  role: string
  avatar?: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const content = (
    <div className="relative">
      <GlowingEffect 
        proximity={150}
        spread={45}
        blur={12}
        variant="default"
      />
      <Card
        className={cn(
          "relative w-[350px] flex-shrink-0 border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/15 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
          className
        )}
      >
        <CardContent className="p-6 space-y-4">
          <p className="text-sm leading-relaxed text-white/90 dark:text-white/80">
            "{text}"
          </p>
          <div className="flex items-center gap-3">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-10 w-10 rounded-full border-2 border-white/30"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                {author.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-sm text-white">
                {author.name}
              </p>
              <p className="text-xs text-white/70 dark:text-white/60">
                {author.role}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}
