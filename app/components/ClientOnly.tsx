import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const ClientOnlyComponent = ({ children, fallback }: ClientOnlyProps) => {
  return <>{children}</>
}

// Disable SSR for this component
const ClientOnly = dynamic(() => Promise.resolve(ClientOnlyComponent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-8 h-8 text-white">✨</div>
        </div>
        <p className="text-white text-lg">Loading BlinkShot...</p>
      </div>
    </div>
  )
})

export default ClientOnly 