import { useState, type ReactNode } from 'react'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

type ExpandableGridProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  initialCount?: number
  batchSize?: number
  gridClassName?: string
  showMoreLabel?: string
  showLessLabel?: string
  controlsClassName?: string
}

export function ExpandableGrid<T>({
  items,
  getKey,
  renderItem,
  initialCount = 3,
  batchSize = 3,
  gridClassName = 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
  showMoreLabel = 'Show more',
  showLessLabel = 'Show less',
  controlsClassName,
}: ExpandableGridProps<T>) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length
  const canShowLess = visibleCount > initialCount

  return (
    <>
      <div className={gridClassName}>
        {visibleItems.map((item) => (
          <div key={getKey(item)}>{renderItem(item)}</div>
        ))}
      </div>
      {hasMore || canShowLess ? (
        <div className={cn('mt-10 flex justify-center gap-4', controlsClassName)}>
          {hasMore ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((count) => Math.min(count + batchSize, items.length))}
            >
              {showMoreLabel}
            </Button>
          ) : null}
          {canShowLess ? (
            <Button variant="outline" size="lg" onClick={() => setVisibleCount(initialCount)}>
              {showLessLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
