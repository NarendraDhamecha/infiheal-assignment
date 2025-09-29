import React, { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  width: number
  height: number
  alt: string
  className?: string
}

// Sets the img src only when visible in viewport to reduce bursty loads
function LazyImageImpl({ src, width, height, alt, className }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const node = imgRef.current
    if (!node) return

    // If IntersectionObserver isn't supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin: '300px 0px', threshold: 0.01 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      loading="lazy"
      className={className}
    />
  )
}

export const LazyImage = React.memo(LazyImageImpl)


