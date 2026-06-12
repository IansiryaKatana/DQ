import type { Book, CmsSnapshot, PromoTile } from '#/lib/cms/types'
import { PublicLayout } from '#/components/layout/PublicLayout'
import { HeroSection } from '#/components/sections/HeroSection'
import { WhatsInsideSection } from '#/components/sections/WhatsInsideSection'
import { GreatestVentureSection } from '#/components/sections/GreatestVentureSection'
import { DonationProductsSection } from '#/components/sections/DonationProductsSection'
import { StoriesSection } from '#/components/sections/StoriesSection'
import { QuickDonationSection } from '#/components/sections/QuickDonationSection'
import { BlogPreviewSection } from '#/components/sections/BlogPreviewSection'
import { QuranWikiBanner } from '#/components/sections/QuranWikiBanner'
import { PromoTilesSection } from '#/components/sections/PromoTilesSection'

function bookGridTiles(books: Book[]): PromoTile[] {
  return books.slice(0, 3).map((book, index) => ({
    id: book.id,
    title: book.title,
    imageUrl: book.cardCoverImageUrl || book.coverImageUrl,
    linkUrl: `/books/${book.slug}`,
    sortOrder: index + 1,
  }))
}

export function HomePage({ data, books }: { data: CmsSnapshot; books: Book[] }) {
  const promoBookTiles = bookGridTiles(books)

  return (
    <PublicLayout data={data}>
      <div className="relative isolate">
        <HeroSection hero={data.hero} className="sticky top-0 z-[1]" />
        <WhatsInsideSection content={data.whatsInside} className="sticky top-0 z-[2]" />
      </div>
      <GreatestVentureSection section={data.ventureSection} images={data.ventureImages} />
      <DonationProductsSection products={data.donationProducts} />
      <StoriesSection stories={data.stories} />
      <QuickDonationSection products={data.quickDonations} />
      <BlogPreviewSection posts={data.blogPosts} />
      <QuranWikiBanner banner={data.quranWiki} />
      <PromoTilesSection tiles={promoBookTiles.length ? promoBookTiles : data.promoTiles} />
    </PublicLayout>
  )
}
