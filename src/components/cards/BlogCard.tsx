import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import type { BlogPost } from '#/lib/cms/types'
import { Badge } from '#/components/ui/badge'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/articles/${post.slug}`} className="block overflow-hidden">
        <img src={post.coverImageUrl} alt={post.title} className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <div className="space-y-3 p-6">
        <Badge>{post.category}</Badge>
        <Link to={`/articles/${post.slug}`}>
          <h3 className="type-title text-dq-black transition-colors group-hover:text-dq-gold">{post.title}</h3>
        </Link>
        <p className="type-body text-dq-muted">{post.excerpt}</p>
        <div className="flex items-center gap-3 pt-2 text-xs text-dq-muted">
          {post.authorAvatar ? <img src={post.authorAvatar} alt={post.authorName} className="h-8 w-8 rounded-full object-cover" /> : null}
          <div>
            <p className="font-light text-dq-black">{post.authorName}</p>
            <p>
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
              {post.readTime ? ` · ${post.readTime}` : ''}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
