import { useEffect } from 'react'

const VIMEO_ORIGIN = 'https://player.vimeo.com'

function postVimeoMessage(iframe, method) {
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage(JSON.stringify({ method }), VIMEO_ORIGIN)
}

export default function useVideoIntersectionObserver({
  targetRef,
  iframeRef,
  threshold = 0.5,
  rootMargin = '0px',
} = {}) {
  useEffect(() => {
    const target = targetRef?.current || iframeRef?.current
    const iframe = iframeRef?.current || targetRef?.current

    if (!target || !iframe || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            postVimeoMessage(iframe, 'play')
          } else {
            postVimeoMessage(iframe, 'pause')
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
      postVimeoMessage(iframe, 'pause')
    }
  }, [iframeRef, rootMargin, targetRef, threshold])
}
