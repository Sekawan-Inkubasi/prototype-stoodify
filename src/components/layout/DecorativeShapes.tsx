import React from 'react'

export const DecorativeShapes: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-90"
    >
      {/* 1. Yellow Pentagon (Top Right spill) */}
      <svg
        className="absolute -top-16 -right-16 w-80 h-80 transform rotate-12 transition-transform duration-700"
        viewBox="0 0 100 100"
      >
        <polygon points="50,0 100,38 81,100 19,100 0,38" fill="#ffda00" />
      </svg>

      {/* 2. Red Semi-Circle (Mid Left spill) */}
      <svg
        className="absolute top-[35%] -left-24 w-72 h-72 transform -rotate-45"
        viewBox="0 0 100 100"
      >
        <path d="M 0,50 A 50,50 0 0,1 100,50 Z" fill="#ff4141" />
      </svg>

      {/* 3. Powder Sky Circle (Mid Right background) */}
      <div className="absolute top-[55%] -right-20 w-88 h-88 rounded-full bg-[#91d8ec] transform rotate-6" />

      {/* 4. Jelly Green Triangle (Bottom Left spill) */}
      <svg
        className="absolute -bottom-24 -left-16 w-96 h-96 transform rotate-[25deg]"
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 95,95 5,95" fill="#16ab59" />
      </svg>

      {/* 5. Bubblegum Pink Star/Cutout (Bottom Right spill) */}
      <svg
        className="absolute -bottom-20 right-[15%] w-72 h-72 transform -rotate-12"
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 63,35 98,35 70,57 81,91 50,70 19,91 30,57 2,35 37,35"
          fill="#ffbac4"
        />
      </svg>

      {/* 6. Subtle Frost Blue Accent Blob (Hero Center Background) */}
      <div className="absolute top-28 left-[15%] w-64 h-64 rounded-full bg-[#e1edff]/60 -z-10 blur-2xl" />
    </div>
  )
}
