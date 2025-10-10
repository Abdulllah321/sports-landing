import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const baseButtonStyle = `
  relative isolate inline-flex items-center justify-center
  gap-2 whitespace-nowrap overflow-hidden rounded-md px-3 py-2 h-9
  text-left text-sm font-medium group shadow transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]
  focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
`;


const buttonVariants = cva(
  baseButtonStyle,
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/90   /* gradient overlays (now visible by default) */
          before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md
          before:bg-gradient-to-b before:from-primary-foreground/15 before:to-black/10 before:opacity-100
          before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)]
          after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md
          after:bg-gradient-to-b after:from-white/5 after:to-transparent after:mix-blend-overlay ring-1 ring-primary bg-primary text-primary-foreground `,
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 ',
        secondary:
          `bg-secondary text-secondary-foreground hover:bg-secondary/80 ring-0   /* gradient overlays (now visible by default) */
          before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md
          before:bg-gradient-to-b before:from-primary-foreground/15 before:to-black/10 before:opacity-100
          before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)]
          after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md
          after:bg-gradient-to-b after:from-white/5 after:to-transparent after:mix-blend-overlay`,
        ghost:
          `hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md
          before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] before:from-primary-foreground/15 before:to-black/10 before:opacity-100
          before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)]`,
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
