import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { DonationProduct } from '#/lib/cms/types'
import { Button } from '#/components/ui/button'

export function QuickDonationCard({ product }: { product: DonationProduct }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl bg-white shadow-md">
      <img src={product.imageUrl} alt={product.title} className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-64" />
      <div className="space-y-3 p-6">
        <h3 className="type-title text-dq-black">{product.title}</h3>
        <p className="type-body text-dq-muted">{product.description}</p>
        <Button asChild variant="gold">
          <Link to={product.ctaUrl}>{product.ctaLabel}</Link>
        </Button>
      </div>
    </motion.article>
  )
}
