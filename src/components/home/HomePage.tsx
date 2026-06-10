import type { CmsSnapshot, PromoTile } from '#/lib/cms/types'
import { Header } from '#/components/layout/Header'
import { Footer } from '#/components/layout/Footer'
import { HeroSection } from '#/components/sections/HeroSection'
import { WhatsInsideSection } from '#/components/sections/WhatsInsideSection'
import { GreatestVentureSection } from '#/components/sections/GreatestVentureSection'
import { DonationProductsSection } from '#/components/sections/DonationProductsSection'
import { StoriesSection } from '#/components/sections/StoriesSection'
import { QuickDonationSection } from '#/components/sections/QuickDonationSection'
import { BlogPreviewSection } from '#/components/sections/BlogPreviewSection'
import { QuranWikiBanner } from '#/components/sections/QuranWikiBanner'
import { PromoTilesSection } from '#/components/sections/PromoTilesSection'

function quranWikiGridTiles(articles: CmsSnapshot['quranWikiArticles']): PromoTile[] {
  return articles.slice(0, 3).map((article, index) => ({
    id: article.id,
    title: article.title,
    imageUrl: article.coverImageUrl,
    linkUrl: `/quran-wiki/${article.slug}`,
    sortOrder: index + 1,
  }))
}

export function HomePage({ data }: { data: CmsSnapshot }) {
  const wikiGridTiles = quranWikiGridTiles(data.quranWikiArticles)

  return (
    <div className="min-h-screen bg-white">
      <Header
        links={data.navigation}
        appStoreUrl={data.siteSettings.app_store_url}
        playStoreUrl={data.siteSettings.play_store_url}
        donateUrl={data.siteSettings.donate_url ?? '/donate'}
      />
      <main>
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
        <PromoTilesSection tiles={wikiGridTiles.length ? wikiGridTiles : data.promoTiles} />
      </main>
      <Footer footer={data.footer} links={data.navigation} />
    </div>
  )
}
