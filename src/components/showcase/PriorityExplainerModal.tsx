import React from 'react'
import { CircleHelp, CheckCircle2, Clock, AlertTriangle, Layers, Calendar } from 'lucide-react'
import { useStoodify } from '../../context'
import { Modal } from '../ui/Modal'
import { PillButton } from '../ui/PillButton'
import { Badge } from '../ui/Badge'

export const PriorityExplainerModal: React.FC = () => {
  const {
    isPriorityExplainerOpen,
    closePriorityExplainer,
    selectedTaskForDetail,
    tasks,
    subjects,
    updateTaskProgress,
    updateTaskStatus,
  } = useStoodify()

  if (!selectedTaskForDetail) return null

  const task = tasks.find((item) => item.id === selectedTaskForDetail.id) ?? selectedTaskForDetail
  const subject = subjects.find((s) => s.id === task.subjectId)
  const breakdown = task.priorityBreakdown

  const handleProgressChange = (newVal: number) => {
    updateTaskProgress(task.id, newVal)
  }

  return (
    <Modal
      isOpen={isPriorityExplainerOpen}
      onClose={closePriorityExplainer}
      title="Rincian skor prioritas"
      subtitle={`Kalkulasi lokal untuk data contoh: "${task.title}"`}
      maxWidth="lg"
    >
      <div className="space-y-6 text-left">
        {/* Top Summary Card */}
        <div className="p-5 rounded-[20px] bg-[#f0f6ff] border border-[#e1edff] flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="mono" size="sm">
                {subject?.code || 'MAPEL'}
              </Badge>
              <span className="text-xs text-[#111118]/70">
                Deadline: {new Date(task.deadline).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h3 className="text-lg text-[#111118]">{task.title}</h3>
          </div>

          <div className="flex items-center justify-between border-t pt-3 border-[#e1edff]">
            <span className="text-xs text-[#111118]/60 uppercase font-mono">Skor Prioritas</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl text-[#2727e6] font-mono leading-none">{task.priorityScore}</span>
              <span className="text-xs text-[#111118]/40 font-mono">/ 100</span>
            </div>
            <Badge
              variant={
                task.priority === 'sangat-tinggi'
                  ? 'priority-urgent'
                  : task.priority === 'tinggi'
                  ? 'priority-high'
                  : task.priority === 'sedang'
                  ? 'priority-medium'
                  : 'priority-low'
              }
              size="sm"
              className="mt-1"
            >
              {task.priority.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="p-4 rounded-[20px] bg-white border border-[#e1edff]">
          <div className="flex items-center gap-2 mb-2 text-[#111118]">
            <CircleHelp size={18} />
            <h4 className="text-sm font-normal">Mengapa tugas ini mendapat skor tersebut?</h4>
          </div>
          <p className="text-sm text-[#111118] leading-relaxed">
            {task.priorityReason}
          </p>
        </div>

        {/* Multi-Factor Mathematical Breakdown */}
        <div>
          <h4 className="text-sm font-normal text-[#111118] mb-3 flex items-center gap-2">
            <Layers size={16} className="text-[#2727e6]" />
            <span>Faktor dalam kalkulasi contoh</span>
          </h4>

          <div className="grid grid-cols-1 gap-3 text-xs">
            {/* Urgency */}
            <div className="p-3.5 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#111118]/70 flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#ff4141]" /> Urgensi Batas Waktu
                </span>
                <span className="font-mono text-[#111118] font-medium">+{breakdown.urgencyScore} / 40</span>
              </div>
              <p className="text-[11px] text-[#111118]/60">Dihitung dari selisih jam menuju deadline.</p>
            </div>

            {/* Difficulty */}
            <div className="p-3.5 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#111118]/70 flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-[#ffda00]" /> Tingkat Kesulitan ({task.difficulty}/5)
                </span>
                <span className="font-mono text-[#111118]">+{breakdown.difficultyScore} / 20</span>
              </div>
              <p className="text-[11px] text-[#111118]/60">Materi rumit memerlukan fokus kognitif lebih awal.</p>
            </div>

            {/* Duration */}
            <div className="p-3.5 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#111118]/70 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#91d8ec]" /> Estimasi Durasi ({task.estimatedDurationMinutes}m)
                </span>
                <span className="font-mono text-[#111118]">+{breakdown.durationScore} / 15</span>
              </div>
              <p className="text-[11px] text-[#111118]/60">Tugas panjang harus dipecah menjadi beberapa sesi.</p>
            </div>

            <div className="p-3.5 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#111118]/75">Bobot jenis tugas ({task.type})</span>
                <span className="font-mono text-[#111118]">+{breakdown.importanceScore} / 15</span>
              </div>
              <p className="text-[11px] text-[#111118]/70">Jenis tugas memengaruhi bobot contoh.</p>
            </div>

            <div className="p-3.5 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#111118]/70 flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-[#ff4141]" /> Risiko Keterlambatan
                </span>
                <span className="font-mono text-[#111118]">+{breakdown.lateRiskScore} / 10</span>
              </div>
              <p className="text-[11px] text-[#111118]/70">Bertambah bila tenggat dekat dan progres masih rendah.</p>
            </div>
          </div>

          {/* Progress Deduction */}
          <div className="mt-3 p-3.5 rounded-[16px] bg-[#e1edff] border border-[#e1edff] flex items-center justify-between text-xs">
            <span className="text-[#111118] flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#111118]" /> Pengurang Progres ({task.progressPercent}%)
            </span>
            <span className="font-mono text-[#111118]">-{breakdown.progressScore} poin</span>
          </div>
        </div>

        {/* Live Progress Slider within Modal */}
        <div className="p-4 rounded-[20px] bg-[#f0f6ff] border border-[#e1edff]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#111118]">Ubah Progres Pengerjaan:</span>
            <span className="font-mono text-sm text-[#2727e6]">{task.progressPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={task.progressPercent}
            onChange={(e) => handleProgressChange(Number(e.target.value))}
            className="w-full accent-[#2727e6] cursor-pointer"
          />
          <p className="text-xs text-[#111118]/60 mt-1">
            Semakin tinggi progres, skor prioritas contoh berkurang.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#e1edff]">
          {task.status !== 'selesai' ? (
            <button
              onClick={() => {
                updateTaskStatus(task.id, 'selesai')
                closePriorityExplainer()
              }}
              className="min-h-11 text-xs text-[#111118] underline-offset-4 hover:underline cursor-pointer flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]"
            >
              <CheckCircle2 size={14} /> Tandai Sudah Selesai
            </button>
          ) : (
            <span className="text-xs text-[#111118]">Tugas ini telah selesai</span>
          )}

          <PillButton variant="primary" size="sm" onClick={closePriorityExplainer}>
            Tutup Penjelasan
          </PillButton>
        </div>
      </div>
    </Modal>
  )
}
