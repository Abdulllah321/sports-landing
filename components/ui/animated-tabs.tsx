'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTabsProps {
  tabs: Array<{
    value: string
    label: string
    content?: React.ReactNode
  }>
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  contentClassName?: string
}

export function AnimatedTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  contentClassName,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.value || '')
  const [indicatorStyle, setIndicatorStyle] = React.useState({ width: 0, left: 0 })
  const tabsRef = React.useRef<HTMLDivElement>(null)
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())

  const currentValue = value ?? activeTab

  const updateIndicator = React.useCallback(() => {
    if (!tabsRef.current || !currentValue) return

    const activeTabElement = tabRefs.current.get(currentValue)
    if (!activeTabElement) return

    const tabsContainer = tabsRef.current
    const containerRect = tabsContainer.getBoundingClientRect()
    const tabRect = activeTabElement.getBoundingClientRect()

    setIndicatorStyle({
      width: tabRect.width,
      left: tabRect.left - containerRect.left,
    })
  }, [currentValue])

  React.useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue)
    onValueChange?.(tabValue)
  }

  const activeTabData = tabs.find(tab => tab.value === currentValue)

  return (
    <div className={cn('w-full', className)}>
      <div className="relative" ref={tabsRef}>
        <div className="bg-muted/50 text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-1 relative">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(tab.value, el)
                }
              }}
              onClick={() => handleTabClick(tab.value)}
              className={cn(
                'relative z-10 text-foreground/70 dark:text-muted-foreground inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                currentValue === tab.value && 'text-foreground font-semibold'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {currentValue && (
          <motion.div
            className="absolute top-1 bottom-1 bg-background dark:bg-background/90 rounded-md shadow-sm border border-border/50"
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
          />
        )}
      </div>

      {activeTabData?.content && (
        <motion.div
          key={currentValue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn('mt-4', contentClassName)}
        >
          {activeTabData.content}
        </motion.div>
      )}
    </div>
  )
}
