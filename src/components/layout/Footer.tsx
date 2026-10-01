import { GraduationCap, ShieldCheck, Cpu, Code2, Sparkles } from 'lucide-react'
import { useStoodify } from '../../context'

export const Footer: React.FC = () => {
  const { setActiveView, resetToDefault } = useStoodify()

  return (
    <footer className="w-full bg-[#111118] text-white py-12 px-4 sm:px-6 mt-20 relative z-10 border-t border-[#111118]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[5000px] bg-[#2727e6] flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="text-xl tracking-tight font-normal">Stoodify</span>
              <span className="text-[10px] font-mono uppercase bg-[#2727e6] text-white px-2 py-0.5 rounded-[5000px]">
                Inkubasi 2026
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed font-normal">
              Bukan sekadar aplikasi to-do list. Stoodify mengubah jadwal sekolah, deadline, tingkat kesulitan, dan aktivitas siswa menjadi rencana belajar harian yang realistis.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-gray-400 font-mono">
              <span className="inline-flex items-center gap-1 bg-[#1a1a24] px-2.5 py-1 rounded-[5000px] border border-gray-800">
                <Cpu size={12} className="text-[#91d8ec]" /> AI Scheduler Engine
              </span>
              <span className="inline-flex items-center gap-1 bg-[#1a1a24] px-2.5 py-1 rounded-[5000px] border border-gray-800">
                <Sparkles size={12} className="text-[#ffda00]" /> Next Topic Predictor
              </span>
              <span className="inline-flex items-center gap-1 bg-[#1a1a24] px-2.5 py-1 rounded-[5000px] border border-gray-800">
                <Code2 size={12} className="text-[#16ab59]" /> Go + Supabase Backend
              </span>
            </div>
          </div>

          {/* Col 2: Navigasi Fitur */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-[#91d8ec] tracking-wider mb-3">Fitur Prototipe</h4>
            <ul className="space-y-1.5 text-sm text-gray-300 font-normal">
              <li>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard Siswa
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('tasks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Prioritas Tugas Cerdas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('schedule')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rekomendasi Sesi AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('predictions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Prediksi Materi Selanjutnya
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('calendar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kalender Terpadu
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Roadmap & Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-[#ffbac4] tracking-wider mb-3">Arah Produk</h4>
            <ul className="space-y-1.5 text-sm text-gray-300 font-normal">
              <li>
                <button
                  onClick={() => setActiveView('roadmap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard Guru & Kelas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('roadmap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Smart Workload Balancer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('roadmap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Arsitektur & Target 6 Bulan
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset semua data demo ke kondisi awal?')) {
                      resetToDefault()
                    }
                  }}
                  className="text-xs text-[#ffda00] hover:underline cursor-pointer"
                >
                  ↻ Reset Demo Data
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2026 Stoodify Inc. Dilindungi Hak Cipta • Dibangun untuk Pameran Inkubasi Startup Pendidikan</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#16ab59]" />
            <span>Desain Otentik SuperHi • Bebas AI Slop</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
