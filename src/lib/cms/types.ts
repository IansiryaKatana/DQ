export type NavLink = {
  id: string
  label: string
  href: string
  sortOrder: number
  showInHeader: boolean
  showInFooter: boolean
  footerGroup?: string | null
}

export type HeroContent = {
  id: string
  titleLine1: string
  titleLine2: string
  titleLine3: string
  highlightWord: string
  description: string
  imageUrl: string
  primaryCtaLabel: string
  primaryCtaUrl: string
  secondaryCtaLabel: string
  secondaryCtaUrl: string
}

export type WhatsInsideContent = {
  id: string
  heading: string
  highlightWord: string
  introHtml: string
  bullets: string[]
  imageUrl: string
  backgroundColor?: string | null
}

export type VentureSection = {
  id: string
  heading: string
  highlightWord: string
  subtitle: string
  description: string
}

export type VentureImage = {
  id: string
  imageUrl: string
  alt: string
  caption?: string | null
  sortOrder: number
}

export type DonationProduct = {
  id: string
  slug: string
  title: string
  description: string
  imageUrl: string
  price?: number | null
  currency?: string | null
  category?: string | null
  stockStatus?: string | null
  ctaLabel: string
  ctaUrl: string
  kind: 'product' | 'quick'
  sortOrder: number
}

export type StoryPoster = {
  id: string
  title: string
  imageUrl: string
  videoUrl?: string | null
  linkUrl?: string | null
  sortOrder: number
}

export type Author = {
  id: string
  name: string
  avatarUrl?: string | null
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImageUrl: string
  category: string
  authorName: string
  authorAvatar?: string | null
  publishedAt: string
  readTime?: string | null
}

export type PromoTile = {
  id: string
  title: string
  imageUrl: string
  linkUrl: string
  sortOrder: number
}

export type QuranWikiBanner = {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  linkUrl: string
}

export type QuranWikiArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImageUrl: string
  category: string
  authorName: string
  authorAvatar?: string | null
  publishedAt: string
  readTime?: string | null
}

export type FooterSettings = {
  id: string
  aboutText: string
  email: string
  phone: string
  address: string
  copyright: string
  developerCredit?: string | null
  socialLinks: { label: string; href: string }[]
}

export type SiteSettings = Record<string, string>

export type CmsSnapshot = {
  mode: 'live' | 'static'
  navigation: NavLink[]
  hero: HeroContent
  whatsInside: WhatsInsideContent
  ventureSection: VentureSection
  ventureImages: VentureImage[]
  donationProducts: DonationProduct[]
  quickDonations: DonationProduct[]
  stories: StoryPoster[]
  blogPosts: BlogPost[]
  promoTiles: PromoTile[]
  quranWiki: QuranWikiBanner
  quranWikiArticles: QuranWikiArticle[]
  footer: FooterSettings
  siteSettings: SiteSettings
}
