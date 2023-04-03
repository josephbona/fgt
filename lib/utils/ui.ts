import { default as _slugify } from 'slugify'
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(input: string) {
  return _slugify(input, {
    lower: true,
    trim: true
  })
}

export function formatCurrency(amount: string | number) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}