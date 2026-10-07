import React from 'react'
import { useStoodify } from '../../context'

export const DecorativeShapes: React.FC = () => {
  const { activeView } = useStoodify()
  if (activeView !== 'dashboard') return null

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-55"
    >
      <svg
        className="absolute -top-16 -right-16 w-48 h-48 transform rotate-12"
        viewBox="0 0 100 100"
      >
        <polygon points="50,0 100,38 81,100 19,100 0,38" fill="#ffda00" />
      </svg>

      <svg
        className="absolute top-[37%] -left-24 w-40 h-40 transform -rotate-45"
        viewBox="0 0 100 100"
      >
        <path d="M 0,50 A 50,50 0 0,1 100,50 Z" fill="#ff4141" />
      </svg>

      <div className="absolute top-[57%] -right-16 w-48 h-48 rounded-full bg-[#91d8ec]" />

      <svg
        className="absolute -bottom-20 -left-20 w-52 h-52 transform rotate-[25deg]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 95,95 5,95" fill="#16ab59" />
      </svg>

      <svg
        className="absolute -bottom-16 right-[15%] w-40 h-40 transform -rotate-12"
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 63,35 98,35 70,57 81,91 50,70 19,91 30,57 2,35 37,35"
          fill="#ffbac4"
        />
      </svg>
    </div>
  )
}
