export type Testimonial = {
  quote: string
  name: string
  role: string
  company?: string
}

/**
 * Client testimonials for Recursa Technologies.
 * Add verified quotes from clients here.
 * If this array is empty or contains entries with 'TODO',
 * the testimonials slider is automatically hidden.
 */
export const TESTIMONIALS: Testimonial[] = []
