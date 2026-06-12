import type { BlogPost } from '#/lib/cms/types'
import { PageHero } from '#/components/layout/PageHero'
import { DonationCtaBanner } from '#/components/layout/DonationCtaBanner'
import { Container } from '#/components/ui/container'
import { BlogCard } from '#/components/cards/BlogCard'

type ArticlesPageProps = {
  posts: BlogPost[]
}

export function ArticlesPage({ posts }: ArticlesPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Learn"
        title="Articles &"
        highlight="Insights"
        description="Explore reflections, guides, and stories that deepen your connection with the Qur'an and the impact of giving."
        variant="cream"
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          {posts.length === 0 ? (
            <p className="type-body text-center text-dq-muted">No articles published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <DonationCtaBanner />
    </>
  )
}
