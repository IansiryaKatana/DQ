import { Link } from '@tanstack/react-router'
import { PayPalIcon } from '#/components/icons/PayPalIcon'
import { cn } from '#/lib/utils'

type FloatingActionBubbleProps = {
  donateUrl?: string
  className?: string
}

const donateFabClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-paypal-blue bg-paypal-blue text-white shadow-[0_8px_24px_rgba(0,112,186,0.35)] transition-transform hover:scale-105 hover:border-[#005ea6] hover:bg-[#005ea6] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dq-gold'

export function FloatingActionBubble({ donateUrl = '/donate', className }: FloatingActionBubbleProps) {
  return (
    <Link
      to={donateUrl}
      className={cn('fixed bottom-5 right-5 z-40 2xl:hidden', donateFabClass, className)}
      aria-label="Donate with PayPal"
    >
      <PayPalIcon className="h-5 w-5" />
    </Link>
  )
}
