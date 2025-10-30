import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "py-12 sm:py-24 md:py-32 px-4",
      className
    )}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 sm:gap-16">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-white/70 sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-4 gap-4 flex-row">
            {/* First set for infinite scroll */}
            <div className="flex shrink-0 gap-4 animate-marquee flex-row group-hover:[animation-play-state:paused] [--duration:50s]">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`set1-${i}`}
                  {...testimonial}
                />
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex shrink-0 gap-4 animate-marquee flex-row group-hover:[animation-play-state:paused] [--duration:50s]">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`set2-${i}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>

          {/* Gradient fades on both sides */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent sm:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent sm:w-48" />
        </div>
      </div>
    </section>
  )
}
