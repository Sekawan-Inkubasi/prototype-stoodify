import React from 'react'
import { Calendar, Clock, RotateCcw } from 'lucide-react'
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
      title="Simulasi sesi terlewat"
      subtitle="Contoh perubahan jadwal lokal. Tidak ada layanan AI atau pemeriksaan bentrok yang berjalan."
      maxWidth="lg"
    >
      <div className="space-y-6 text-left">
        <div className="p-4 rounded-[20px] bg-[#f0f6ff] border border-[#e1edff] text-sm text-[#111118]">
          <div className="flex items-center gap-2 mb-1.5">
            <RotateCcw size={17} aria-hidden="true" />
            <span>Skenario contoh:</span>
          </div>
          <p className="text-xs text-[#111118]/80 leading-relaxed font-normal">
            Sesi ini terlewat karena ada kegiatan lain. Simulasi akan menyimpan sesi asal sebagai riwayat lalu membuat sesi pengganti pada waktu contoh.
          </p>
        </div>

        {/* Before & After Comparison */}
        <div className="grid grid-cols-1 gap-4 items-center">
          {/* Sesi Saat Ini (Akan Dilewati) */}
          <div className="p-4 rounded-[20px] bg-[#fff0f3] border border-[#ffbac4] text-left">
            <span className="text-[11px] font-mono uppercase text-[#111118]/70 block mb-2">
              SESI ASAL
            </span>
            <h4 className="text-base text-[#111118] font-normal mb-1">{activeSession.title}</h4>
            <div className="flex items-center gap-2 text-xs text-[#111118]/70 mb-3">
              <Clock size={14} className="text-[#ff4141]" />
              <span>{activeSession.date} · {activeSession.startTime} - {activeSession.endTime}</span>
            </div>
            <Badge variant="default" size="sm">
              Status: Dilewati
            </Badge>
          </div>

          {/* Sesi Pengganti Usulan AI */}
          <div className="p-4 rounded-[20px] bg-[#f0f6ff] border-2 border-[#2727e6] shadow-hard-card text-left relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Calendar size={18} className="text-[#2727e6]" />
            </div>
            <span className="text-[11px] font-mono uppercase text-[#2727e6] font-medium block mb-2">
              WAKTU PENGGANTI CONTOH
            </span>
            <h4 className="text-base text-[#111118] font-normal mb-1">{activeSession.title}</h4>
            <div className="flex items-center gap-2 text-xs text-[#111118]/70 mb-3">
              <Calendar size={14} className="text-[#2727e6]" />
              <span>Hari berikutnya · 20:15 - 21:00</span>
            </div>
            <Badge variant="active" size="sm">
              Simulasi lokal
            </Badge>
          </div>
        </div>

        <div className="rounded-[16px] border border-[#e1edff] p-4 text-xs leading-relaxed text-[#111118]/75">
          Waktu pengganti ini untuk memperlihatkan perubahan di kalender. Prototipe belum memeriksa jadwal sekolah atau deadline secara otomatis.
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
            Terapkan simulasi
          </PillButton>
        </div>
      </div>
    </Modal>
  )
}
