import React from 'react'

export const AnnouncementTicker: React.FC = () => {
  const tickerMessage =
    '✨ STOODIFY • ASISTEN BELAJAR CERDAS BERBASIS AI SISWA INDONESIA • BUKAN HANYA MENCATAT TUGAS, TAPI MENGATUR KAPAN & BAGAIMANA DISELESAIKAN • DEMO INKUBASI 2026'

  return (
    <div className="relative w-full bg-[#111118] text-white h-8 overflow-hidden flex items-center z-40 select-none">
      {/* Left gradient fade mask sesuai DESIGN.md */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#111118] via-[#111118]/80 to-transparent z-10 pointer-events-none" />

      {/* Right gradient fade mask */}
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#111118] via-[#111118]/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="animate-marquee whitespace-nowrap font-mono text-xs tracking-wider uppercase">
        <span className="mx-4">{tickerMessage}</span>
        <span className="mx-2">•</span>
        <span className="mx-4">{tickerMessage}</span>
        <span className="mx-2">•</span>
        <span className="mx-4">{tickerMessage}</span>
        <span className="mx-2">•</span>
        <span className="mx-4">{tickerMessage}</span>
      </div>
    </div>
  )
}
