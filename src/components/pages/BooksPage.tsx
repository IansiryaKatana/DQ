import { useMemo, useState } from 'react'
import type { Book } from '#/lib/cms/types'
import { PageHero } from '#/components/layout/PageHero'
import { DonationCtaBanner } from '#/components/layout/DonationCtaBanner'
import { Container } from '#/components/ui/container'
import { BookCard } from '#/components/cards/BookCard'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

export function BooksPage({ books }: { books: Book[] }) {
  const categories = useMemo(() => ['All', ...new Set(books.map((b) => b.category))], [books])
  const [category, setCategory] = useState('All')
  const filtered = category === 'All' ? books : books.filter((b) => b.category === category)

  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Books of the"
        highlight="Qur'an"
        description="Featured surahs and thematic guides — written to help you understand and reflect on the Book of Allah."
        variant="cream"
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={category === cat ? 'gold' : 'outline'}
                size="sm"
                onClick={() => setCategory(cat)}
                className={cn(category !== cat && 'normal-case tracking-normal')}
              >
                {cat}
              </Button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="type-body text-center text-dq-muted">No books published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <DonationCtaBanner />
    </>
  )
}
