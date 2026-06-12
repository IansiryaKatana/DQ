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
        description="Vertical story posters from our campaigns — real moments of Qur'an distribution and transformation."
        variant="cream"
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stories.map((story) => (
              <div key={story.id} className="w-[280px] shrink-0">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <DonationCtaBanner />
    </>
  )
}
