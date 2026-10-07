import React from 'react'
import { ArrowUpRight, BookOpenCheck, CalendarDays, UsersRound } from 'lucide-react'

const milestones = [
  {
    label: 'Fondasi siswa',
    timing: 'MVP',
    description: 'Kelola mata pelajaran, jadwal, tugas, prioritas, rekomendasi sesi, dan kalender belajar.',
    icon: <CalendarDays size={20} aria-hidden="true" />,
  },
  {
    label: 'Belajar lebih adaptif',
    timing: 'Tahap berikutnya',
    description: 'Kembangkan prediksi materi, penjadwalan ulang, pengingat, serta ringkasan progres berdasarkan penggunaan.',
    icon: <BookOpenCheck size={20} aria-hidden="true" />,
  },
  {
    label: 'Kolaborasi sekolah',
    timing: 'Arah jangka lanjut',
    description: 'Jelajahi pembagian tugas kelas dan ringkasan beban tugas untuk guru, dengan batas privasi siswa.',
    icon: <UsersRound size={20} aria-hidden="true" />,
  },
]

export const RoadmapView: React.FC = () => (
  <div className="relative z-10 space-y-10 text-left">
    <header className="max-w-3xl">
      <p className="mb-2 font-mono text-xs text-[#111118]/70">ARAH PENGEMBANGAN</p>
      <h1 className="text-3xl tracking-tight">Dari rencana pribadi ke koordinasi belajar</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#111118]/75">
        PRD membagi pengembangan Stoodify dari pengelolaan belajar siswa menuju rekomendasi yang lebih adaptif dan kolaborasi sekolah. Tahap di bawah adalah arah rencana, bukan fitur yang sudah tersedia.
      </p>
    </header>

    <ol className="space-y-0">
      {milestones.map((milestone, index) => <li key={milestone.label} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4[5rem_minmax(0,1fr)]">
        <div className="relative flex justify-center">
          <span className="z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#2727e6] text-white">{milestone.icon}</span>
          {index < milestones.length - 1 && <span aria-hidden="true" className="absolute bottom-0 top-11 w-px bg-[#e1edff]" />}
        </div>
        <div className="mb-8 min-w-0 border-b border-[#e1edff] pb-7">
          <p className="font-mono text-xs text-[#111118]/70">{milestone.timing}</p>
          <h2 className="mt-1 text-xl">{milestone.label}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#111118]/75">{milestone.description}</p>
        </div>
      </li>)}
    </ol>

    <aside className="flex max-w-3xl items-start gap-3 rounded-[24px] bg-[#ffda00] p-5 text-sm leading-relaxed text-[#111118]">
      <ArrowUpRight size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p>Kolaborasi kelas dan dashboard guru berada di tahap lanjutan pada dokumen produk. Tampilan prototipe ini belum mewakili sistem sekolah yang berfungsi.</p>
    </aside>
  </div>
)
