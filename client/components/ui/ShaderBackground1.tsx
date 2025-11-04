"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import MistOverlay from "./MistOverlay"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden">
      {/* Dark gray gradient background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={[
          "#2c3e50",
          "#34495e", 
          "#4a6572",
          "#556b78",
          "#5d7684",
          "#556b78",
          "#4a6572",
          "#34495e",
          "#2c3e50",
        ]}
        speed={0.1} // Reduced speed for better performance
        backgroundColor="#2c3e50"
      />

      {/* Mist Overlay with 90% transparency */}
      <MistOverlay />

      {children}
    </div>
  )
}