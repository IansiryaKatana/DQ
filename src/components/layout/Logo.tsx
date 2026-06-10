import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'

type LogoProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, variant = 'light' }: LogoProps) {
  const src = variant === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'

  return (
    <Link to="/" className={cn('inline-flex shrink-0', className)} aria-label="Donate Qur'an home">
      <img src={src} alt="dq" className="h-9 w-auto md:h-10" width={80} height={40} />
    </Link>
  )
}
