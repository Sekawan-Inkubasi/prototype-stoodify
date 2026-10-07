import React from 'react'
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Clock,
  LogOut,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Route,
} from 'lucide-react'
import { useStoodify } from '../../context'
import type { ActiveView } from '../../context'
import { PillButton } from '../ui/PillButton'

interface NavbarProps {
  onLogout: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { activeView, setActiveView, openAddTask, resetToDefault, profile } = useStoodify()
  const [moreOpen, setMoreOpen] = React.useState(false)

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Hari ini', icon: <Clock size={19} aria-hidden="true" /> },
    { id: 'tasks', label: 'Tugas', icon: <CheckSquare size={19} aria-hidden="true" /> },
    { id: 'schedule', label: 'Sesi', icon: <BookOpen size={19} aria-hidden="true" /> },
    { id: 'calendar', label: 'Kalender', icon: <Calendar size={19} aria-hidden="true" /> },
  ]
  const moreItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'predictions', label: 'Prediksi materi', icon: <BookOpen size={18} aria-hidden="true" /> },
    { id: 'roadmap', label: 'Arah produk', icon: <Route size={18} aria-hidden="true" /> },
  ]

  const navigate = (view: ActiveView) => {
    setMoreOpen(false)
    setActiveView(view)
  }

  React.useEffect(() => {
    if (!moreOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [moreOpen])

  return (
    <>
      <header className="relative z-30 flex h-14 shrink-0 items-center justify-between border-b border-[#e1edff] bg-white px-4 pt-[env(safe-area-inset-top)]">
        <button
          type="button"
          onClick={() => navigate('dashboard')}
          aria-label="Stoodify, kembali ke Hari ini"
          className="text-xl tracking-tight text-[#111118] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2727e6]"
        >
          Stoodify
        </button>
        <div className="flex items-center gap-3">
          <PillButton type="button" size="sm" onClick={openAddTask} aria-label="Tambah tugas" className="gap-1 px-3">
            <Plus size={17} aria-hidden="true" />
            <span className="hidden @sm:inline">Tambah</span>
          </PillButton>
          <span
            title={`${profile.name} • ${profile.school}`}
            aria-label={`Profil ${profile.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#111118] bg-[#ffda00] font-mono text-xs text-[#111118] shadow-hard-card"
          >
            {profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
      </header>

      <nav aria-label="Navigasi utama" className="absolute bottom-0 left-0 right-0 z-40 grid shrink-0 grid-cols-5 border-t border-[#e1edff] bg-white px-1 pt-1 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {moreOpen && <button type="button" aria-label="Tutup menu lainnya" className="absolute inset-x-0 bottom-full z-0 h-dvh" onClick={() => setMoreOpen(false)} />}
        {navItems.map((item) => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative z-10 flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] transition-colors ${isActive ? 'text-[#2727e6]' : 'text-[#111118]'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        })}
        <div className="relative z-10 flex justify-center">
          <button
            type="button"
            aria-label="Lainnya"
            aria-expanded={moreOpen}
            aria-haspopup="menu"
            onClick={() => setMoreOpen((open) => !open)}
            className={`flex min-h-12 min-w-14 flex-col items-center justify-center gap-0.5 text-[11px] ${moreItems.some((item) => item.id === activeView) ? 'text-[#2727e6]' : 'text-[#111118]'}`}
          >
            <MoreHorizontal size={19} aria-hidden="true" />
            <span>Lainnya</span>
          </button>
          {moreOpen && (
            <div role="menu" aria-label="Menu lainnya" className="absolute bottom-full right-1 z-20 mb-2 w-56 rounded-[20px] border border-[#e1edff] bg-white p-2 shadow-hard-card">
              {moreItems.map((item) => (
                <button key={item.id} type="button" role="menuitem" onClick={() => navigate(item.id)} className="flex min-h-11 w-full items-center gap-3 rounded-[16px] px-3 text-left text-sm text-[#111118] hover:bg-[#f0f6ff] focus-visible:outline-2 focus-visible:outline-[#2727e6]">
                  {item.icon}{item.label}
                </button>
              ))}
              <div className="my-1 border-t border-[#e1edff]" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMoreOpen(false)
                  if (window.confirm('Kembalikan data contoh ke kondisi awal?')) resetToDefault()
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-[16px] px-3 text-left text-sm text-[#111118] hover:bg-[#f0f6ff] focus-visible:outline-2 focus-visible:outline-[#2727e6]"
              >
                <RotateCcw size={18} aria-hidden="true" />Reset data contoh
              </button>
              <button type="button" role="menuitem" onClick={onLogout} className="flex min-h-11 w-full items-center gap-3 rounded-[16px] px-3 text-left text-sm text-[#111118] hover:bg-[#f0f6ff] focus-visible:outline-2 focus-visible:outline-[#2727e6]">
                <LogOut size={18} aria-hidden="true" />Keluar demo
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
