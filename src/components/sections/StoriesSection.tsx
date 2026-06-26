import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { StoryPoster } from '#/lib/cms/types'
import { Container } from '#/components/ui/container'
import { SectionHeading } from '#/components/ui/section-heading'
import { StoryCard } from '#/components/cards/StoryCard'
import { Button } from '#/components/ui/button'

const fullBleedX = 'px-5 md:px-8 lg:px-10 xl:px-12'

export function StoriesSection({ stories }: { stories: StoryPoster[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const stopActiveStory = () => setActiveStoryId(null)
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('scroll', stopActiveStory)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
      emblaApi.off('scroll', stopActiveStory)
    }
  }, [emblaApi, onSelect])

  if (!stories.length) return null

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <Container className="mb-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading title="Watch Stories," highlight="Learn, and Be Inspired" />
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="icon" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()} aria-label="Previous stories">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled={!canNext} onClick={() => emblaApi?.scrollNext()} aria-label="Next stories">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>

      <div className={fullBleedX}>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-center gap-5 md:gap-6">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                isPlaying={activeStoryId === story.id}
                onPlayChange={(playing) => setActiveStoryId(playing ? story.id : null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
