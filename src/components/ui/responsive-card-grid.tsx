import { useCallback, useEffect, useState, type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

const fullBleedX = 'px-5 md:px-8'

const carouselSlideClass =
  'min-w-0 shrink-0 grow-0 pl-4 basis-[calc(100vw-2.5rem)] md:basis-[calc((100vw-3rem)/2)]'

const DEFAULT_DESKTOP_BATCH_SIZE = 3

type ResponsiveCardGridProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  gapClass?: string
  showMoreLabel?: string
  showLessLabel?: string
  carouselLabel: string
  desktopColumns?: 3 | 4
  desktopBatchSize?: number
  fullWidth?: boolean
  desktopDividers?: boolean
}

export function ResponsiveCardGrid<T>({
  items,
  getKey,
  renderItem,
  gapClass = 'gap-6',
  showMoreLabel = 'Show more',
  showLessLabel = 'Show less',
  carouselLabel,
  desktopColumns = 3,
  desktopBatchSize = DEFAULT_DESKTOP_BATCH_SIZE,
  fullWidth = false,
  desktopDividers = false,
}: ResponsiveCardGridProps<T>) {
  const [visibleCount, setVisibleCount] = useState(desktopBatchSize)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length
  const canShowLess = visibleCount > desktopBatchSize

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, items.length])

  const carouselControls = (
    <div className="flex shrink-0 gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={!canPrev}
        onClick={() => emblaApi?.scrollPrev()}
        aria-label={`Previous ${carouselLabel}`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={!canNext}
        onClick={() => emblaApi?.scrollNext()}
        aria-label={`Next ${carouselLabel}`}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  if (!items.length) return null

  return (
    <>
      <div className={cn('mb-6 flex justify-end lg:hidden', fullBleedX)}>{carouselControls}</div>

      <div className={cn(fullBleedX, 'lg:hidden')}>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {items.map((item) => (
              <div key={getKey(item)} className={carouselSlideClass}>
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('hidden lg:block', fullWidth && fullBleedX)}>
        <div
          className={cn(
            'grid',
            desktopColumns === 4 ? 'grid-cols-4' : 'grid-cols-3',
            gapClass,
          )}
        >
          {visibleItems.map((item) => (
            <div
              key={getKey(item)}
              className={cn(
                desktopDividers && 'border border-dotted border-dq-border/60',
              )}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
        {hasMore || canShowLess ? (
          <div className="mt-10 flex justify-center gap-4">
            {hasMore ? (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((count) => Math.min(count + desktopBatchSize, items.length))}
              >
                {showMoreLabel}
              </Button>
            ) : null}
            {canShowLess ? (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount(desktopBatchSize)}
              >
                {showLessLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  )
}
