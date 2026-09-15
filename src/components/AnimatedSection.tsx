'use client'

import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

// useLayoutEffect warns when React renders on the server, but we specifically
// need a pre-paint hook on the client to avoid a flash. Pick per environment.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // The critical bit: this starts `false`, so the server-rendered HTML has
  // opacity 1. Previously `initial={{ opacity: 0 }}` was serialised into the
  // SSR markup, which meant every heading and paragraph on the page stayed
  // invisible until the JS bundle downloaded and hydrated. On a phone that
  // bundle queues behind the images, so the page looked completely blank.
  // Now the text is readable immediately and the fade is pure enhancement --
  // if JS is slow, blocked, or errors out, the content is still there.
  const [armed, setArmed] = useState(false)

  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    // Only opt in to the fade for content that begins below the fold. Running
    // this before paint means there is no visible "shown then hidden" flicker,
    // and anything already on screen is simply left alone.
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true)
  }, [reduceMotion])

  const hidden = armed && !isInView

  return (
    <motion.div
      ref={ref}
      // `initial={false}` renders straight at the `animate` value instead of
      // baking a hidden state into the server markup.
      initial={false}
      animate={hidden ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
      transition={
        hidden
          ? { duration: 0 }
          : { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: 'easeOut' }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
