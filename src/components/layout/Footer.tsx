import React from 'react'
import { RotateCcw } from 'lucide-react'
import { useStoodify } from '../../context'

export const Footer: React.FC = () => {
  const { resetToDefault } = useStoodify()

  return (
    <footer className="relative z-10 mt-12 border-t border-[#e1edff] bg-white px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-[#111118]/75">
          Prototipe showcase Stoodify. Tugas dan rekomendasi yang tampil adalah data contoh, disimpan di perangkat ini.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Kembalikan data contoh ke kondisi awal?')) resetToDefault()
          }}
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-[48px] px-4 text-[#111118] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset data contoh
        </button>
      </div>
    </footer>
  )
}
