import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { HeroContent } from '#/lib/cms/types'
import { Button } from '#/components/ui/button'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

function heroBackgroundSources(hero: HeroContent) {
  const desktop = hero.imageUrl
  const tablet = hero.imageUrlTablet?.trim() || desktop
  const mobile = hero.imageUrlMobile?.trim() || tablet || desktop
  return { desktop, tablet, mobile }
}

export function HeroSection({ hero, className }: { hero: HeroContent; className?: string }) {
  const { desktop, tablet, mobile } = heroBackgroundSources(hero)

  return (
    <section className={cn('relative h-dvh overflow-hidden', className)}>
      {desktop ? (
        <picture className="absolute inset-0">
          <source media="(min-width: 1024px)" srcSet={desktop} />
          <source media="(min-width: 768px)" srcSet={tablet} />
          <img
            src={mobile}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[center_right] md:object-right"
          />
        </picture>
      ) : null}
      <Container className="relative flex h-full items-start py-10 md:items-center md:py-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h1 className="type-display text-dq-black">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
            <br />
            <span className="text-dq-gold">{hero.highlightWord}</span>
          </h1>
          <p className="type-body mt-8 max-w-lg text-dq-muted">{hero.description}</p>
          <div className="mt-10 flex flex-nowrap items-center gap-2 md:gap-5">
            <Button
              asChild
              variant="black"
              size="lg"
              className="h-10 shrink-0 px-3.5 text-[0.625rem] tracking-[0.1em] md:h-12 md:px-8 md:text-sm md:tracking-[0.18em]"
            >
              <Link to={hero.primaryCtaUrl} className="whitespace-nowrap">
                {hero.primaryCtaLabel}
              </Link>
            </Button>
            <Button
              asChild
              variant="link"
              className="h-auto min-w-0 shrink justify-start gap-1.5 p-0 text-[0.625rem] tracking-[0.08em] md:gap-2 md:text-sm md:tracking-normal"
            >
              <Link to={hero.secondaryCtaUrl} className="whitespace-nowrap">
                {hero.secondaryCtaLabel}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
