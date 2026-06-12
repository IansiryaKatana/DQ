import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import type { Book, BookDetail } from '#/lib/cms/types'
import { Container } from '#/components/ui/container'
import { Badge } from '#/components/ui/badge'
import { BookCard } from '#/components/cards/BookCard'
import { DonationCtaBanner } from '#/components/layout/DonationCtaBanner'

export function BookDetailPage({ book, related }: { book: BookDetail; related: Book[] }) {
  return (
    <>
      <article>
        <div className="relative overflow-hidden">
          <img src={book.coverImageUrl} alt={book.title} className="block h-auto w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-dq-black/70 via-dq-black/20 to-transparent" />
        </div>
        <Container className="relative -mt-12 pb-12 md:-mt-16">
          <Link
            to="/books"
            className="type-label mb-6 inline-flex items-center gap-2 text-white/80 hover:text-dq-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            All books
          </Link>
          <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
            <Badge>{book.category}</Badge>
            <h1 className="type-headline mt-4 text-dq-black">{book.title}</h1>
            <p className="mt-2 text-sm text-dq-muted">
              {book.authorName} · {format(new Date(book.publishedAt), 'MMMM d, yyyy')}
              {book.readTime ? ` · ${book.readTime}` : ''}
            </p>
            <div
              className="prose-dq mt-8 max-w-none [&_p]:type-body [&_p]:text-dq-muted"
              dangerouslySetInnerHTML={{ __html: book.bodyHtml }}
            />
          </div>
        </Container>
      </article>
      {related.length > 0 ? (
        <section className="bg-dq-cream/40 py-16 md:py-24">
          <Container>
            <h2 className="type-title mb-8 text-dq-black">More books</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BookCard key={item.id} book={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <DonationCtaBanner />
    </>
  )
}
