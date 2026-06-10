import { cn } from '#/lib/utils'

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('type-eyebrow inline-flex rounded-full bg-dq-gold px-3 py-1.5 text-dq-black', className)}>
      {children}
    </span>
  )
}
