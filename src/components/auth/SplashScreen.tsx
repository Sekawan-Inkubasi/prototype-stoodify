import React from 'react'

export const SplashScreen: React.FC = () => (
  <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-8 text-center" role="status" aria-live="polite">
    <p className="text-3xl tracking-tight text-[#111118]">Stoodify</p>
    <div className="mt-8 h-1 w-28 overflow-hidden rounded-full bg-[#e1edff]" aria-hidden="true">
      <div className="h-full w-1/2 animate-[splash-progress_1.2s_ease-in-out_infinite] rounded-full bg-[#2727e6]" />
    </div>
    <p className="mt-4 text-sm text-[#111118]/70">Menyiapkan ruang belajarmu</p>
  </main>
)
