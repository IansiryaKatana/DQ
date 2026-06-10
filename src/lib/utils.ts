import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number | null | undefined, currency = 'USD') {
  if (amount == null) return null
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}
