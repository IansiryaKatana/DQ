import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { StoryPoster } from '#/lib/cms/types'

export function StoryCard({ story }: { story: StoryPoster }) {
  const content = (
    <motion.div whileHover={{ y: -6 }} className="relative aspect-[9/16] w-[260px] shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg md:w-[280px]">
      <img src={story.imageUrl} alt={story.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <p className="type-title absolute bottom-5 left-5 right-5 text-white">{story.title}</p>
    </motion.div>
  )

  return story.linkUrl ? <Link to={story.linkUrl}>{content}</Link> : content
}
