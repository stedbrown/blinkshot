import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

interface Particle {
  id: number
  left: string
  top: string
  animationDelay: string
  animationDuration: string
}

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }: LoadingSpinnerProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  // Generate particles only on client side
  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }))
    setParticles(generatedParticles)
  }, [])

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Main spinner rings */}
        <div className={`${sizeClasses[size]} relative`}>
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400 animate-spin"></div>
          
          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 border-l-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Floating particles around spinner */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading text */}
      <div className={`${textSizeClasses[size]} text-purple-100 font-medium animate-pulse`}>
        {text}
      </div>
    </div>
  )
} 