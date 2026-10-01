import React from 'react'
import { AlertCircle, Calendar, Check, Clock, Zap } from 'lucide-react'
import { useStoodify } from '../../context'
import { Modal } from '../ui/Modal'
import { PillButton } from '../ui/PillButton'
import { Badge } from '../ui/Badge'

export const RescheduleSimulatorModal: React.FC = () => {
  const { isRescheduleModalOpen, closeRescheduleModal, sessions, selectedSessionForAction, simulateReschedule } = useStoodify()

  // Sesi yang akan disimulasikan: sesi yang dipilih atau sesi aktif pertama
  const activeSession = selectedSessionForAction || sessions.find((s) => s.status === 'scheduled') || sessions[0]

  if (!activeSession) return null

  const handleRunReschedule = () => {
    simulateReschedule(activeSession.id)
  }

  return (
    <Modal
      isOpen={isRescheduleModalOpen}
      onClose={closeRescheduleModal}
      title="Simulasi Adaptive Rescheduling AI"
      subtitle="Fitur Pembeda Utama: Bagaimana Stoodify menyusun ulang jadwal ketika siswa melewatkan sesi belajar"
      maxWidth="lg"
    >
      <div className="space-y-6 text-left">
        {/* Real-world Problem Statement */}
        <div className="p-4 rounded-[20px] bg-[#fffbe0] border border-[#ffda00] text-sm text-[#111118]">
          <div className="flex items-center gap-2 mb-1.5 font-normal">
            <AlertCircle size={18} className="text-[#ffda00]" />
            <span>Skenario Nyata Siswa Indonesia:</span>
          </div>
          <p className="text-xs text-[#111118]/80 leading-relaxed font-normal">
            Naufal ada kegiatan ekskul Robotik mendadak dan perlu istirahat, sehingga sesi belajar malam ini pukul 19.00 tidak dapat terlaksana. Di aplikasi to-do list biasa, tugas hanya akan menjadi merah atau terlambat.
          </p>
        </div>

        {/* Before & After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Sesi Saat Ini (Akan Dilewati) */}
          <div className="p-4 rounded-[20px] bg-[#fff0f3] border border-[#ffbac4] text-left">
            <span className="text-[11px] font-mono uppercase text-[#ff4141] font-medium block mb-2">
              KONDISI SEKARANG
            </span>
            <h4 className="text-base text-[#111118] font-normal mb-1">{activeSession.title}</h4>
            <div className="flex items-center gap-2 text-xs text-[#111118]/70 mb-3">
              <Clock size={14} className="text-[#ff4141]" />
              <span>Hari ini • {activeSession.startTime} - {activeSession.endTime}</span>
            </div>
            <Badge variant="priority-urgent" size="sm">
              Status: Akan Dilewati
            </Badge>
          </div>

          {/* Sesi Pengganti Usulan AI */}
          <div className="p-4 rounded-[20px] bg-[#f0f6ff] border-2 border-[#2727e6] shadow-hard-card text-left relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Zap size={18} className="text-[#2727e6]" />
            </div>
            <span className="text-[11px] font-mono uppercase text-[#2727e6] font-medium block mb-2">
              REKOMENDASI ADAPTIF AI
            </span>
            <h4 className="text-base text-[#111118] font-normal mb-1">{activeSession.title}</h4>
            <div className="flex items-center gap-2 text-xs text-[#111118]/70 mb-3">
              <Calendar size={14} className="text-[#2727e6]" />
              <span>Besok Malam • 20:15 - 21:00</span>
            </div>
            <Badge variant="active" size="sm">
              Slot Bebas Ditemukan
            </Badge>
          </div>
        </div>

        {/* AI Rule Guarantees */}
        <div className="p-4 rounded-[20px] bg-[#f0f6ff] border border-[#e1edff] text-xs space-y-2">
          <h5 className="font-normal text-[#111118] flex items-center gap-1.5 text-sm mb-1">
            <Check size={16} className="text-[#16ab59]" /> Jaminan Algoritma Stoodify:
          </h5>
          <ul className="space-y-1.5 text-[#111118]/80 pl-2">
            <li>✓ Tidak bentrok dengan jam sekolah (07.00 - 15.30).</li>
            <li>✓ Menghindari waktu les dan istirahat siswa.</li>
            <li>✓ Dijamin selesai sebelum batas deadline tugas.</li>
            <li>✓ Tidak membebani siswa lebih dari 3 sesi belajar per hari.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e1edff]">
          <PillButton variant="ghost" onClick={closeRescheduleModal}>
            Tutup
          </PillButton>
          <PillButton
            variant="primary"
            onClick={handleRunReschedule}
            withArrow
          >
            ⚡ Simulasikan Reschedule Otomatis
          </PillButton>
        </div>
      </div>
    </Modal>
  )
}
