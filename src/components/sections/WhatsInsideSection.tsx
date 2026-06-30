import { motion } from 'motion/react'
import type { WhatsInsideContent } from '#/lib/cms/types'
import { Container } from '#/components/ui/container'
import { SectionHeading } from '#/components/ui/section-heading'
import { cn } from '#/lib/utils'

export function WhatsInsideSection({ content, className }: { content: WhatsInsideContent; className?: string }) {
  return (
    <section
      className={cn('relative flex h-dvh overflow-hidden', className)}
      style={content.backgroundColor ? { backgroundColor: content.backgroundColor } : undefined}
    >
      {content.imageUrl ? (
        <img
          src={content.imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : null}

      <Container className="relative flex h-full w-full items-center overflow-y-auto py-10 md:py-16">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl md:max-w-2xl"
        >
          <SectionHeading title={content.heading} highlight={content.highlightWord} />
          <div
            className="prose-dq type-body mt-8 space-y-4 text-dq-muted"
            dangerouslySetInnerHTML={{ __html: content.introHtml }}
          />
          <ul className="type-body mt-8 space-y-3 text-dq-black">
            {content.bullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dq-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  )
}
