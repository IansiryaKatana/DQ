import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { DonationProduct } from '#/lib/cms/types'
import { Button } from '#/components/ui/button'
import { formatPrice } from '#/lib/utils'

export function DonationCard({ product }: { product: DonationProduct }) {
  const price = formatPrice(product.price ?? null, product.currency ?? 'USD')

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-dq-gold/60 bg-white shadow-sm transition-shadow hover:border-dq-gold hover:shadow-lg"
    >
      <Link to={product.ctaUrl} className="block overflow-hidden">
        <img src={product.imageUrl} alt={product.title} className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {product.category ? <p className="type-eyebrow text-dq-muted">{product.category}</p> : null}
        <h3 className="type-title text-dq-black">{product.title}</h3>
        <p className="type-body flex-1 text-dq-muted">{product.description}</p>
        {price ? <p className="type-body text-dq-black">{price}</p> : null}
        {product.stockStatus ? <p className="text-xs text-dq-muted">{product.stockStatus}</p> : null}
        <Button asChild variant="gold" size="sm" className="mt-auto w-full">
          <Link to={product.ctaUrl}>{product.ctaLabel}</Link>
        </Button>
      </div>
    </motion.article>
  )
}
