import type { QuranWikiBanner as QuranWikiBannerType } from '#/lib/cms/types'
import { Container } from '#/components/ui/container'

export function QuranWikiBanner({ banner }: { banner: QuranWikiBannerType }) {
  if (!banner.imageUrl?.trim()) return null

  return (
    <section className="py-10">
      <Container>
        <a href={banner.linkUrl} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-3xl">
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="h-56 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 md:h-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center md:translate-y-[60px] md:px-12">
            <p className="type-headline text-dq-black">{banner.title}</p>
            <p className="type-eyebrow mt-3 text-dq-gold">{banner.subtitle}</p>
          </div>
        </a>
      </Container>
    </section>
  )
}
