import React from 'react'

export const AnnouncementTicker: React.FC = () => {
  const tickerMessage =
    'STOODIFY • CONTOH PROTOTIPE • UBAH TUGAS MENJADI RENCANA BELAJAR YANG REALISTIS • DATA DEMO TERSIMPAN DI PERANGKAT INI'

  return (
    <div className="relative w-full bg-[#111118] text-white h-8 overflow-hidden flex items-center z-40 select-none">
      <div aria-hidden="true" className="absolute left-0 inset-y-0 w-16 bg-linear-to-r from-[#2727e6] to-transparent pointer-events-none" />
      <p className="relative mx-auto max-w-[1200px] truncate px-5 text-center font-mono text-[11px] tracking-tight sm:px-8 sm:text-xs">
        <span className="sm:hidden">STOODIFY • PROTOTIPE DATA CONTOH</span>
        <span className="hidden sm:inline">{tickerMessage}</span>
      </p>
    </div>
  )
}
