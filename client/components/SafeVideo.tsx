"use client"

import React from "react"

type VideoSource = {
  src: string
  type?: string
}

type SafeVideoProps = {
  sources: VideoSource[]
  className?: string
  style?: React.CSSProperties
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  preload?: "auto" | "metadata" | "none"
  controls?: boolean
  onLoadedData?: (e: React.SyntheticEvent<HTMLVideoElement>) => void
  onError?: (e: React.SyntheticEvent<HTMLVideoElement>) => void
}

export function SafeVideo({
  sources,
  className,
  style,
  poster = "/hero-video-poster.jpg",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "metadata",
  controls = false,
  onLoadedData,
  onError,
}: SafeVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [failed, setFailed] = React.useState(false)

  const tryNextSource = React.useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1
      return next < sources.length ? next : prev
    })
  }, [sources.length])

  const handleError = React.useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (currentIndex < sources.length - 1) {
        console.log("[v0] SafeVideo: source failed, trying next", {
          index: currentIndex,
          src: sources[currentIndex]?.src,
        })
        tryNextSource()
      } else {
        console.log("[v0] SafeVideo: all sources failed, falling back to poster")
        setFailed(true)
      }
      onError?.(e)
    },
    [currentIndex, onError, sources, tryNextSource],
  )

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Reload and attempt autoplay when source changes
    video.load()
    const playIfAllowed = async () => {
      if (!autoPlay) return
      try {
        await video.play()
      } catch (err) {
        console.log("[v0] SafeVideo: autoplay prevented or failed", err)
      }
    }
    playIfAllowed()
  }, [currentIndex, autoPlay])

  if (!sources || sources.length === 0 || failed) {
    // Poster fallback
    return (
      <div
        className={className}
        style={{
          backgroundImage: `url('${poster}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...style,
        }}
        aria-label="Video fallback image"
        role="img"
      />
    )
  }

  const active = sources[currentIndex]

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      controls={controls}
      onLoadedData={onLoadedData}
      onError={handleError}
    >
      <source src={active.src} type={active.type || "video/mp4"} />
    </video>
  )
}