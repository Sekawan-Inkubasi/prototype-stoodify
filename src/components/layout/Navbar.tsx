import React from 'react'
import {
  Sparkles,
  CheckSquare,
  Clock,
  Compass,
  Calendar,
  Rocket,
  Plus,
  RotateCcw,
  GraduationCap,
} from 'lucide-react'
import { useStoodify } from '../../context'
import type { ActiveView } from '../../context'
import { PillButton } from '../ui/PillButton'

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, openAddTask, resetToDefault, profile } = useStoodify()

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Sparkles size={16} /> },
    { id: 'tasks', label: 'Tugas & Prioritas', icon: <CheckSquare size={16} /> },
    { id: 'schedule', label: 'Rekomendasi AI', icon: <Clock size={16} /> },
    { id: 'predictions', label: 'Prediksi Materi', icon: <Compass size={16} /> },
    { id: 'calendar', label: 'Kalender', icon: <Calendar size={16} /> },
    { id: 'roadmap', label: 'Arah Produk', icon: <Rocket size={16} /> },
  ]

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-[#e1edff]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Round Icon Container 48px sesuai DESIGN.md */}
          <div className="w-10 h-10 rounded-[5000px] bg-[#2727e6] flex items-center justify-center text-white shadow-hard-card group-hover:scale-105 transition-transform">
            <GraduationCap size={22} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl tracking-tight text-[#111118] font-normal leading-none">
                Stoodify
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#e1edff] text-[#2727e6] px-2 py-0.5 rounded-[5000px]">
                AI Assistant
              </span>
            </div>
            <p className="text-[11px] text-[#111118]/60 leading-tight">Smart Study Orchestrator</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f0f6ff] p-1.5 rounded-[5000px] border border-[#e1edff]">
          {navItems.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5000px] text-sm transition-all cursor-pointer font-normal ${
                  isActive
                    ? 'bg-[#2727e6] text-white shadow-hard-card'
                    : 'text-[#111118] hover:bg-white/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Reset Demo Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset data ke kondisi awal demo pameran?')) {
                resetToDefault()
              }
            }}
            title="Reset ke data awal demo pameran"
            className="hidden sm:inline-flex items-center gap-1 text-xs py-2 px-3 rounded-[5000px] bg-[#f0f6ff] hover:bg-[#e1edff] text-[#111118] border border-[#e1edff] transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>

          {/* Add Task Button */}
          <PillButton
            size="sm"
            onClick={openAddTask}
            className="gap-1.5"
          >
            <Plus size={16} />
            <span>Tambah Tugas</span>
          </PillButton>

          {/* Student Profile Avatar */}
          <div
            title={`${profile.name} • ${profile.school}`}
            className="flex items-center gap-2 pl-2 border-l border-[#e1edff] text-left"
          >
            <div className="w-9 h-9 rounded-[5000px] bg-[#ffda00] text-[#111118] border border-[#111118] flex items-center justify-center text-xs font-mono shadow-hard-card">
              NP
            </div>
            <div className="hidden xl:block">
              <p className="text-xs text-[#111118] leading-tight font-normal">{profile.name}</p>
              <p className="text-[10px] text-[#111118]/60 font-mono">XII SIJA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (App‑style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f0f6ff] border-t border-[#e1edff] flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                isActive ? 'text-[#2727e6]' : 'text-[#111118]'
              }`}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full ${isActive ? 'bg-[#2727e6] text-white' : 'bg-white'}`}>
                {item.icon}
              </span>
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  )
}
