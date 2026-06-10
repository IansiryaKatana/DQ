import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { HeroContent } from '#/lib/cms/types'
import { Button } from '#/components/ui/button'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

export function HeroSection({ hero, className }: { hero: HeroContent; className?: string }) {
  return (
    <section className={cn('relative h-dvh overflow-hidden', className)}>
      {hero.imageUrl ? (
        <img
          src={hero.imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[center_right] md:object-right"
        />
      ) : null}
      <Container className="relative flex h-full items-center py-10 md:py-16">
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
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button asChild variant="black" size="lg">
              <Link to={hero.primaryCtaUrl}>{hero.primaryCtaLabel}</Link>
            </Button>
            <Button asChild variant="link" className="justify-start gap-2">
              <Link to={hero.secondaryCtaUrl}>
                {hero.secondaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
