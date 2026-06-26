import type { StoryPoster } from '#/lib/cms/types'
import { PageHero } from '#/components/layout/PageHero'
import { Container } from '#/components/ui/container'
import { StoryCard } from '#/components/cards/StoryCard'
import { DonationCtaBanner } from '#/components/layout/DonationCtaBanner'

export function StoriesPage({ stories }: { stories: StoryPoster[] }) {
  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Watch, learn"
        highlight="& be inspired"
        description="Story moments from our campaigns — real Qur'an distribution and transformation in every circle."
        variant="cream"
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </Container>
      </section>
      <DonationCtaBanner />
    </>
  )
}
