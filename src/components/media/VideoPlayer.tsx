import type { FeaturedVideo } from '#/lib/cms/types'
import { cn } from '#/lib/utils'

function youtubeEmbedUrl(url: string) {
  if (url.includes('embed/')) return url
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

export function VideoPlayer({ video, className }: { video: FeaturedVideo; className?: string }) {
  if (video.videoType === 'youtube') {
    return (
      <div className={cn('aspect-video overflow-hidden rounded-2xl bg-black', className)}>
        <iframe
          src={youtubeEmbedUrl(video.videoUrl)}
          title={video.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <video
      className={cn('aspect-video w-full rounded-2xl bg-black', className)}
      controls
      playsInline
      poster={video.thumbnailUrl}
      src={video.videoUrl}
    >
      <track kind="captions" />
    </video>
  )
}
