import React from 'react'
import {
  Clock,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Zap,
  ShieldCheck,
} from 'lucide-react'
import { useStoodify } from '../context'
import { PillButton } from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'

export const ScheduleView: React.FC = () => {
  const {
    sessions,
    subjects,
    tasks,
    startSession,
    openRescheduleModal,
    simulateReschedule,
  } = useStoodify()

  const getSubject = (subjectId: string) => subjects.find((s) => s.id === subjectId)
  const getTask = (taskId: string) => tasks.find((t) => t.id === taskId)

  // Sort sessions by date and startTime
  const sortedSessions = [...sessions].sort((a, b) => {
    const dComp = a.date.localeCompare(b.date)
    if (dComp !== 0) return dComp
    return a.startTime.localeCompare(b.startTime)
  })

  return (
    <div className="space-y-10 text-left relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-[#2727e6] text-white px-2.5 py-0.5 rounded-[5000px]">
              AI Study Scheduler
            </span>
            <span className="text-xs text-[#111118]/60">Algoritma Otomatis Bebas Bentrok</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#111118] font-normal tracking-tight">
            Rekomendasi Jadwal & Sesi Belajar
          </h1>
          <p className="text-sm text-[#111118]/70 mt-1 max-w-2xl font-normal leading-relaxed">
            Stoodify memecah tugas sekolah menjadi sesi terfokus 30–45 menit. Jadwal ini otomatis menghindari jam sekolah, istirahat, ekskul, dan menjamin tugas selesai sebelum batas waktu.
          </p>
        </div>

        <PillButton
          variant="dark"
          size="md"
          onClick={() => openRescheduleModal()}
          className="self-start sm:self-auto flex-shrink-0 w-full sm:w-auto"
        >
          ⚡ Simulasi Reschedule
        </PillButton>
      </div>

      {/* Standout Showcase: How It Works & Rescheduling Principle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card space-y-2">
          <div className="w-9 h-9 rounded-[5000px] bg-[#e1edff] text-[#2727e6] flex items-center justify-center">
            <Zap size={18} />
          </div>
          <h4 className="text-base font-normal text-[#111118]">1. Chunking Realistis</h4>
          <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
            Tugas 3 jam tidak dipaksakan selesai dalam 1 malam. AI membaginya ke dalam 3 sesi 45 menit dengan target terukur.
          </p>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card space-y-2">
          <div className="w-9 h-9 rounded-[5000px] bg-[#ffe8e8] text-[#ff4141] flex items-center justify-center">
            <ShieldCheck size={18} />
          </div>
          <h4 className="text-base font-normal text-[#111118]">2. Proteksi Waktu Siswa</h4>
          <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
            Sistem mengunci jam sekolah (07.00 - 15.30), ekskul robotik, dan waktu makan keluarga agar siswa tidak *burnout*.
          </p>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-[#2727e6] shadow-hard-card space-y-2">
          <div className="w-9 h-9 rounded-[5000px] bg-[#2727e6] text-white flex items-center justify-center">
            <RotateCcw size={18} />
          </div>
          <h4 className="text-base font-normal text-[#111118]">3. Adaptive Rescheduling</h4>
          <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
            Jika satu sesi terlewat karena urusan mendadak, AI otomatis mencari slot kosong berikutnya sebelum batas deadline.
          </p>
        </div>
      </div>

      {/* Study Sessions Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#e1edff] pb-3">
          <h2 className="text-2xl text-[#111118] font-normal">
            Daftar Sesi Rekomendasi AI
          </h2>
          <span className="text-xs font-mono text-[#111118]/60">
            Total {sortedSessions.length} Sesi Terjadwal
          </span>
        </div>

        <div className="space-y-4">
          {sortedSessions.map((session) => {
            const subj = getSubject(session.subjectId)
            const parentTask = getTask(session.taskId)
            const isCompleted = session.status === 'completed'
            const isRescheduled = session.status === 'rescheduled'

            return (
              <div
                key={session.id}
                className={`p-6 sm:p-7 rounded-[24px] border transition-all w-full ${
                  isCompleted
                    ? 'bg-[#fafcff] border-[#e1edff] opacity-75 shadow-none'
                    : isRescheduled
                    ? 'bg-[#fff5f5] border-[#ffbac4] shadow-hard-card'
                    : 'bg-white border-[#e1edff] shadow-hard-card hover:border-[#2727e6]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column: Timing & Details */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-[5000px] text-white"
                        style={{ backgroundColor: subj?.color || '#2727e6' }}
                      >
                        {subj?.name}
                      </span>
                      <span className="text-xs font-mono text-[#111118] bg-[#f0f6ff] border border-[#e1edff] px-2.5 py-0.5 rounded-[5000px] flex items-center gap-1">
                        <Clock size={12} className="text-[#2727e6]" />
                        {new Date(session.date).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}{' '}
                        • {session.startTime} - {session.endTime} ({session.durationMinutes} Menit)
                      </span>
                      {session.riskLevel === 'tinggi' && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-[5000px] bg-[#ffe8e8] text-[#ff4141]">
                          Risiko Tinggi
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        className={`text-xl text-[#111118] font-normal ${
                          isCompleted ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {session.title}
                      </h3>
                      {parentTask && (
                        <p className="text-xs text-[#2727e6] mt-0.5 font-mono">
                          Tugas Terkait: {parentTask.title}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-[#111118]/80 leading-relaxed font-normal">
                      🎯 <strong className="font-medium text-[#111118]">Target Sesi:</strong>{' '}
                      {session.targetDescription}
                    </p>

                    {/* AI Reasoning Pill */}
                    <div className="p-3 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff] text-xs text-[#111118]/80 flex items-start gap-2">
                      <Sparkles size={14} className="text-[#2727e6] flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#111118] font-medium">Alasan AI: </strong>
                        {session.reason}
                      </span>
                    </div>

                    {/* Rescheduled Notice Banner */}
                    {isRescheduled && session.rescheduledTo && (
                      <div className="p-3 rounded-[16px] bg-[#fff0f3] border border-[#ff4141] text-xs text-[#ff4141] space-y-1">
                        <div className="flex items-center gap-1.5 font-medium">
                          <RotateCcw size={14} />
                          <span>Status: Sesi Ini Dilewati Siswa</span>
                        </div>
                        <p className="text-[11px] text-[#111118]/80 leading-relaxed">
                          ➡️ {session.rescheduledTo.reason} (Target baru: {session.rescheduledTo.date} jam {session.rescheduledTo.startTime} - {session.rescheduledTo.endTime} WIB).
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-[#e1edff] gap-3 min-w-[200px]">
                    <div className="text-left lg:text-right">
                      <span className="text-[11px] text-[#111118]/60 uppercase font-mono block">
                        Status Sesi
                      </span>
                      <Badge
                        variant={
                          isCompleted
                            ? 'success'
                            : isRescheduled
                            ? 'priority-urgent'
                            : 'active'
                        }
                        size="sm"
                      >
                        {isCompleted
                          ? 'SELESAI'
                          : isRescheduled
                          ? 'DI-RESCHEDULE'
                          : 'TERJADWAL'}
                      </Badge>
                    </div>

                    {!isCompleted && !isRescheduled && (
                      <div className="flex items-center gap-2">
                        <PillButton variant="outline" size="sm" onClick={() => simulateReschedule(session.id)} title="Simulasikan sesi ini terlewat" className="w-full sm:w-auto">
                          Lewati
                        </PillButton>
                        <PillButton variant="primary" size="md" withArrow onClick={() => startSession(session)} className="w-full sm:w-auto">
                          Mulai Belajar
                        </PillButton>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="text-xs text-[#16ab59] flex items-center gap-1">
                        <CheckCircle2 size={16} />
                        <span>Selesai Dikerjakan</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
