import React, { useState } from 'react'
import {
  Users,
  AlertTriangle,
  Server,
  Smartphone,
  ShieldCheck,
  Rocket,
  Layers,
} from 'lucide-react'
import { Badge } from '../components/ui/Badge'

export const RoadmapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teacher' | 'tech' | 'milestones'>('teacher')

  return (
    <div className="space-y-10 text-left relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-[#2727e6] text-white px-2.5 py-0.5 rounded-[5000px]">
              Product Direction & Vision
            </span>
            <span className="text-xs text-[#111118]/60">Inkubasi 2026 Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#111118] font-normal tracking-tight">
            Arah Produk & Visi Masa Depan
          </h1>
          <p className="text-sm text-[#111118]/70 mt-1 max-w-2xl font-normal leading-relaxed">
            Stoodify berawal dari prototipe asisten belajar siswa mandiri menuju platform kolaborasi akademik kelas dan ekosistem terpadu sekolah (B2C & B2B).
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-[5000px] border border-[#e1edff] shadow-hard-card self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('teacher')}
            className={`px-4 py-1.5 rounded-[5000px] text-xs font-normal transition-colors cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-[#2727e6] text-white shadow-hard-card'
                : 'text-[#111118] hover:bg-[#f0f6ff]'
            }`}
          >
            Dashboard Guru & Balancer
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-4 py-1.5 rounded-[5000px] text-xs font-normal transition-colors cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-[#2727e6] text-white shadow-hard-card'
                : 'text-[#111118] hover:bg-[#f0f6ff]'
            }`}
          >
            Arsitektur Teknis
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-1.5 rounded-[5000px] text-xs font-normal transition-colors cursor-pointer ${
              activeTab === 'milestones'
                ? 'bg-[#2727e6] text-white shadow-hard-card'
                : 'text-[#111118] hover:bg-[#f0f6ff]'
            }`}
          >
            Milestone 6 Bulan
          </button>
        </div>
      </div>

      {/* Tab 1: Teacher Dashboard & Smart Workload Balancer Preview */}
      {activeTab === 'teacher' && (
        <div className="space-y-6">
          <div className="p-6 rounded-[24px] bg-[#fffbe0] border border-[#ffda00] text-sm text-[#111118] space-y-2">
            <div className="flex items-center gap-2 font-normal text-base text-[#111118]">
              <Users size={20} className="text-[#111118]" />
              <span>Preview Fitur Fase 2: Dashboard Guru & Smart Workload Balancer</span>
            </div>
            <p className="text-xs text-[#111118]/80 leading-relaxed font-normal">
              Masalah klasik di sekolah: Siswa sering mengeluh tugas menumpuk karena guru mapel A, B, dan C memberikan deadline di hari yang sama tanpa saling mengetahui. Guru juga frustrasi karena banyak siswa terlambat mengumpulkan.
            </p>
          </div>

          {/* Interactive Mockup: Teacher Perspective */}
          <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e1edff] pb-4 gap-3">
              <div>
                <span className="text-xs font-mono uppercase text-[#2727e6]">TAMPILAN GURU: IBU RINA (WALI KELAS & GURU)</span>
                <h3 className="text-xl text-[#111118] font-normal">Monitor Beban Tugas Kelas XII SIJA-1</h3>
              </div>
              <Badge variant="mono" size="sm">
                32 Siswa Terhubung
              </Badge>
            </div>

            {/* AI Workload Balancer Warning Box */}
            <div className="p-4 rounded-[20px] bg-[#fff0f3] border-2 border-[#ff4141] text-xs space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#ff4141] font-normal">
                <AlertTriangle size={18} />
                <span>Peringatan Penumpukan Deadline (Smart Workload Balancer)</span>
              </div>
              <p className="text-[#111118]/80 leading-relaxed font-normal">
                ⚠️ <strong>Hari Jumat, 9 Oktober</strong> terdeteksi memiliki <strong>3 deadline besar secara bersamaan</strong> (Proyek REST API PWB, Laporan Praktikum VLAN AIJ, dan Latihan MTK). Estimasi total pengerjaan siswa mencapai <strong>7.5 jam</strong>.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#ff4141] font-mono">
                  Saran AI untuk Guru:
                </span>
                <span className="bg-white border border-[#ff4141] text-[#ff4141] px-2.5 py-1 rounded-[5000px] text-[11px]">
                  Geser deadline Laporan VLAN ke hari Senin (+3 hari)
                </span>
              </div>
            </div>

            {/* Class Aggregated Progress Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-normal text-[#111118]">
                Rekap Tugas Kelas Berjalan (Tanpa Melanggar Privasi Siswa):
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#e1edff] text-[#111118]/60 font-mono uppercase">
                      <th className="py-2.5 px-3">Mata Pelajaran</th>
                      <th className="py-2.5 px-3">Tugas</th>
                      <th className="py-2.5 px-3">Deadline</th>
                      <th className="py-2.5 px-3">Siswa Tuntas</th>
                      <th className="py-2.5 px-3">Beban Kognitif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e1edff]">
                    <tr>
                      <td className="py-3 px-3 font-normal text-[#2727e6]">Pemrograman Web</td>
                      <td className="py-3 px-3">Proyek REST API Toko</td>
                      <td className="py-3 px-3 font-mono">Jumat, 23.59</td>
                      <td className="py-3 px-3 font-mono">11 / 32 Siswa (34%)</td>
                      <td className="py-3 px-3"><Badge variant="priority-urgent" size="sm">Berat (3 Jam)</Badge></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-normal text-[#16ab59]">Infrastruktur Jaringan</td>
                      <td className="py-3 px-3">Laporan Praktikum VLAN</td>
                      <td className="py-3 px-3 font-mono">Jumat, 12.00</td>
                      <td className="py-3 px-3 font-mono">18 / 32 Siswa (56%)</td>
                      <td className="py-3 px-3"><Badge variant="warning" size="sm">Sedang (1.5 Jam)</Badge></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-normal text-[#ff4141]">Matematika Terapan</td>
                      <td className="py-3 px-3">Latihan Soal Diferensial</td>
                      <td className="py-3 px-3 font-mono">Jumat, 07.00</td>
                      <td className="py-3 px-3 font-mono">24 / 32 Siswa (75%)</td>
                      <td className="py-3 px-3"><Badge variant="priority-medium" size="sm">Ringan (1 Jam)</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-3.5 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff] text-[11px] text-[#111118]/70 flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#16ab59] flex-shrink-0" />
              <span>
                <strong>Jaminan Privasi Siswa:</strong> Guru hanya melihat rekap beban tugas kelas dan persentase kelulusan, tidak dapat mengintip catatan harian, obrolan pribadi, atau jadwal keluarga siswa.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Technical Architecture */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          <div className="p-6 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card space-y-4">
            <h3 className="text-xl text-[#111118] font-normal">
              Arsitektur Teknis MVP Inkubasi 2026
            </h3>
            <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
              Mengacu pada role guides tim inkubasi (Backend Golang, AI Specialist 1 & 2, Mobile Dev, DevOps):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#e1edff] space-y-2">
                <span className="text-xs font-mono uppercase text-[#2727e6] font-medium flex items-center gap-1.5">
                  <Server size={14} /> Backend Golang (Go Fiber v2)
                </span>
                <p className="text-xs text-[#111118]/80 leading-relaxed">
                  Performa tinggi dengan konsumsi RAM rendah (~30MB), sangat hemat biaya di tahap awal startup. Skema data di Supabase PostgreSQL dengan otentikasi JWT dan background scheduler goroutine.
                </p>
              </div>

              <div className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#e1edff] space-y-2">
                <span className="text-xs font-mono uppercase text-[#16ab59] font-medium flex items-center gap-1.5">
                  <Smartphone size={14} /> Mobile App (React Native + Expo)
                </span>
                <p className="text-xs text-[#111118]/80 leading-relaxed">
                  Antarmuka mobile lintas platform (fokus Android untuk siswa Indonesia). Form input tugas kilat 1-menit, push notification pengingat, dan widget jadwal harian.
                </p>
              </div>

              <div className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#e1edff] space-y-2">
                <span className="text-xs font-mono uppercase text-[#ff4141] font-medium flex items-center gap-1.5">
                  <Rocket size={14} /> AI Scheduler & Priority Engine
                </span>
                <p className="text-xs text-[#111118]/80 leading-relaxed">
                  Formula prioritas multi-faktor dan adaptive rescheduling engine dengan validasi JSON schema dan mekanisme fallback rule-based jika terjadi kendala koneksi.
                </p>
              </div>

              <div className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#e1edff] space-y-2">
                <span className="text-xs font-mono uppercase text-[#ffda00] font-medium flex items-center gap-1.5">
                  <Layers size={14} /> AI Topic Predictor & RAG
                </span>
                <p className="text-xs text-[#111118]/80 leading-relaxed">
                  Menganalisis urutan tugas lampau siswa terhadap silabus Kurikulum Merdeka Fase E & F untuk menghasilkan prediksi topik berikutnya dan materi prasyarat.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 6-Month Milestones */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="p-6 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card space-y-6">
            <h3 className="text-xl text-[#111118] font-normal">
              Tahapan Eksekusi 6 Bulan (Target PRD Stoodify)
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[#e8f7ee] border border-[#16ab59]/30">
                <div className="w-8 h-8 rounded-[5000px] bg-[#16ab59] text-white flex items-center justify-center flex-shrink-0 font-mono">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-normal text-[#111118]">Bulan 1–2: Validasi Prototipe & Core Engine</h4>
                  <p className="text-[#111118]/70 mt-1 leading-relaxed">
                    Pengembangan prototipe web interaktif (fase saat ini), finalisasi algoritma prioritas tugas, dan validasi persona dengan 3–5 siswa SMP/SMA/SMK.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[#f0f6ff] border border-[#2727e6]/30">
                <div className="w-8 h-8 rounded-[5000px] bg-[#2727e6] text-white flex items-center justify-center flex-shrink-0 font-mono">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-normal text-[#111118]">Bulan 3–4: Uji Coba Pilot di 1 Kelas Nyata</h4>
                  <p className="text-[#111118]/70 mt-1 leading-relaxed">
                    Integrasi backend Golang + Supabase, rilis aplikasi Android Expo di 1 kelas percontohan (30 siswa) untuk mengukur tingkat kepatuhan jadwal dan akurasi prediksi materi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-[16px] bg-[#fffbe0] border border-[#ffda00]">
                <div className="w-8 h-8 rounded-[5000px] bg-[#ffda00] text-[#111118] flex items-center justify-center flex-shrink-0 font-mono">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-normal text-[#111118]">Bulan 5–6: Pameran Inkubasi & Model B2B Sekolah</h4>
                  <p className="text-[#111118]/70 mt-1 leading-relaxed">
                    Showcase di pameran inkubasi 2026, demo dashboard guru & workload balancer, serta penjajakan kerja sama pilot project dengan sekolah mitra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
