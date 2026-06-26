import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { Play } from 'lucide-react'
import { motion } from 'motion/react'
import type { StoryPoster } from '#/lib/cms/types'
import {
  extractYouTubeVideoId,
  resolveStoryPosterUrl,
  youTubeEmbedUrl,
  youTubeThumbnailUrl,
} from '#/lib/media/youtube'
import { cn } from '#/lib/utils'

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setPrefersHover(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return prefersHover
}

type StoryCardProps = {
  story: StoryPoster
  shape?: 'circle' | 'poster'
  isPlaying?: boolean
  onPlayChange?: (playing: boolean) => void
}

const shapeClasses = {
  circle: 'h-[220px] w-[220px] rounded-full ring-2 ring-dq-gold/35 ring-offset-2 ring-offset-white md:h-[260px] md:w-[260px]',
  poster: 'aspect-[9/16] w-[260px] rounded-2xl md:w-[280px]',
} as const

const mediaCoverClass = 'absolute inset-0 h-full w-full object-cover'
const youTubeCoverClass =
  'pointer-events-none absolute left-1/2 top-1/2 h-[178%] w-full max-w-none -translate-x-1/2 -translate-y-1/2 border-0'

export function StoryCard({ story, shape = 'circle', isPlaying: isPlayingProp, onPlayChange }: StoryCardProps) {
  const prefersHover = usePrefersHover()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [internalPlaying, setInternalPlaying] = useState(false)
  const [posterSrc, setPosterSrc] = useState(() => resolveStoryPosterUrl(story))

  const isControlled = isPlayingProp !== undefined
  const isPlaying = isControlled ? isPlayingProp : internalPlaying
  const videoUrl = story.videoUrl?.trim() || ''
  const youTubeId = videoUrl ? extractYouTubeVideoId(videoUrl) : null
  const hasVideo = Boolean(videoUrl)
  const usesVideoFramePoster = hasVideo && !youTubeId && !story.imageUrl?.trim()

  const setPlaying = useCallback(
    (playing: boolean) => {
      if (onPlayChange) onPlayChange(playing)
      if (!isControlled) setInternalPlaying(playing)
    },
    [isControlled, onPlayChange],
  )

  useEffect(() => {
    setPosterSrc(resolveStoryPosterUrl(story))
  }, [story.id, story.videoUrl, story.imageUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video || youTubeId) return

    if (isPlaying) {
      void video.play().catch(() => undefined)
      return
    }

    video.pause()
    video.currentTime = 0
  }, [isPlaying, youTubeId])

  const handlePointerEnter = () => {
    if (prefersHover && hasVideo) setPlaying(true)
  }

  const handlePointerLeave = () => {
    if (prefersHover && hasVideo) setPlaying(false)
  }

  const handlePlayClick = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (hasVideo) setPlaying(true)
  }

  const handlePosterError = () => {
    if (youTubeId) setPosterSrc(youTubeThumbnailUrl(youTubeId, 'hq'))
  }

  const card = (
    <motion.div
      whileHover={hasVideo && prefersHover ? undefined : { y: -6 }}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      className={cn(
        'relative shrink-0 snap-center overflow-hidden bg-dq-soft-black shadow-lg',
        shapeClasses[shape],
      )}
    >
      {!isPlaying && usesVideoFramePoster ? (
        <video
          src={`${videoUrl}#t=0.1`}
          className={cn(mediaCoverClass, shape === 'circle' ? 'scale-110' : '')}
          muted
          playsInline
          preload="metadata"
          aria-label={story.title}
        />
      ) : (
        <img
          src={posterSrc}
          alt=""
          aria-hidden
          onError={handlePosterError}
          className={cn(
            mediaCoverClass,
            'transition-opacity duration-300',
            isPlaying && hasVideo ? 'opacity-0' : 'opacity-100',
            shape === 'circle' ? 'scale-110' : '',
          )}
        />
      )}

      {isPlaying && hasVideo ? (
        youTubeId ? (
          <iframe
            src={youTubeEmbedUrl(youTubeId, { autoplay: true, controls: false, loop: true })}
            title={story.title}
            className={shape === 'circle' ? youTubeCoverClass : cn(mediaCoverClass, 'border-0')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className={mediaCoverClass}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )
      ) : null}

      {hasVideo && !isPlaying ? (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          aria-label={`Play ${story.title}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-dq-gold text-dq-black shadow-lg">
            <Play className="h-6 w-6 fill-current" />
          </span>
        </button>
      ) : null}
    </motion.div>
  )

  if (hasVideo || !story.linkUrl) return card

  return <Link to={story.linkUrl}>{card}</Link>
}
