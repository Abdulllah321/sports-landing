'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState<string | null>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState({ width: 0, left: 0 })
  const tabsRef = React.useRef<HTMLDivElement>(null)
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())

  React.useEffect(() => {
    const updateIndicator = () => {
      if (!tabsRef.current || !activeTab) return

      const activeTabElement = tabRefs.current.get(activeTab)
      if (!activeTabElement) return

      const tabsContainer = tabsRef.current
      const containerRect = tabsContainer.getBoundingClientRect()
      const tabRect = activeTabElement.getBoundingClientRect()

      setIndicatorStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeTab])

  // Listen for tab changes
  React.useEffect(() => {
    const tabsList = tabsRef.current
    if (!tabsList) return

    const observer = new MutationObserver(() => {
      const activeTrigger = tabsList.querySelector('[data-state="active"]') as HTMLButtonElement
      if (activeTrigger) {
        setActiveTab(activeTrigger.getAttribute('data-value') || null)
      }
    })

    observer.observe(tabsList, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-state'] })

    // Set initial active tab
    const activeTrigger = tabsList.querySelector('[data-state="active"]') as HTMLButtonElement
    if (activeTrigger) {
      setActiveTab(activeTrigger.getAttribute('data-value') || null)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative" ref={tabsRef}>
      <TabsPrimitive.List
        ref={ref}
        data-slot="tabs-list"
        className={cn(
          'bg-card/50 text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-1 relative',
          className,
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const props = child.props as any
            return React.cloneElement(child, {
              ref: (el: HTMLButtonElement) => {
                if (el && props?.value) {
                  tabRefs.current.set(props.value, el)
                }
              },
            } as any)
          }
          return child
        })}
      </TabsPrimitive.List>
      
        {activeTab && (
          <motion.div
            className="absolute top-1 bottom-1 rounded-md overflow-hidden"
            initial={false}
            animate={{
              width: indicatorStyle.width,
              left: indicatorStyle.left,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Main background */}
            <div className="absolute inset-0 rounded-md shadow-lg border border-border/60  bg-gradient-to-t from-background/10 via-transparent to-background" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-foreground/10 via-transparent to-black/5 rounded-md" />
            
            {/* Highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-md mix-blend-overlay" />
            
            {/* Ring effect */}
            <div className="absolute inset-0 ring-1 ring-background/50 rounded-md" />
          </motion.div>
        )}
    </div>
  )
})
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      data-value={props.value}
      className={cn(
        "relative z-10 text-foreground/70 dark:text-muted-foreground inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:font-semibold [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = 'TabsTrigger'

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
