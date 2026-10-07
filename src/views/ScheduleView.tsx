import React from 'react'
import { CalendarClock, Check, CheckCircle2, Clock3, RotateCcw, X } from 'lucide-react'
import { useStoodify } from '../context'
import { PillButton } from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'

const displayDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })
}

export const ScheduleView: React.FC = () => {
  const { sessions, subjects, tasks, startSession, completeSession, openRescheduleModal, acceptSession, rejectSession, setActiveView } = useStoodify()
  const getSubject = (id: string) => subjects.find((subject) => subject.id === id)
  const getTask = (id: string) => tasks.find((task) => task.id === id)
  const sortedSessions = [...sessions].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))

  return (
    <div className="relative z-10 space-y-8 text-left">
      <header className="max-w-3xl">
        <p className="mb-2 font-mono text-xs text-[#111118]/70">USULAN BERDASARKAN DATA CONTOH</p>
        <h1 className="text-3xl tracking-tight">Sesi belajar</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#111118]/75">
          Tinjau waktu dan target setiap sesi. Terima usulan, tolak, atau simulasikan perubahan bila sesi terlewat.
        </p>
      </header>

      {sortedSessions.length === 0 ? <div className="rounded-[24px] border border-[#e1edff] bg-white p-8 text-center">
        <p className="mb-4 text-sm text-[#111118]/75">Belum ada usulan sesi. Tambahkan tugas untuk melihat contoh rekomendasi.</p>
        <PillButton size="sm" onClick={() => setActiveView('tasks')}>Lihat tugas</PillButton>
      </div> : <div className="space-y-4">
        {sortedSessions.map((session) => {
          const subject = getSubject(session.subjectId)
          const parentTask = getTask(session.taskId)
          const isProposed = session.status === 'proposed'
          const isCompleted = session.status === 'completed'
          const isInProgress = session.status === 'in-progress'
          const isRescheduled = session.status === 'rescheduled'
          const isRejected = session.status === 'rejected'
          return <article key={session.id} className={`rounded-[24px] border bg-white p-5 ${isProposed ? 'border-[#2727e6] shadow-hard-card' : 'border-[#e1edff]'}`}>
            <div className="flex flex-col gap-5">
              <div className="min-w-0 flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e1edff] px-3 py-1 text-xs text-[#111118]">{subject?.name ?? 'Mata pelajaran'}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f6ff] px-3 py-1 text-xs text-[#111118]">
                    <Clock3 size={13} aria-hidden="true" />{displayDate(session.date)} · {session.startTime}–{session.endTime} · {session.durationMinutes} menit
                  </span>
                </div>
                <div>
                  <h2 className="text-xl leading-snug">{session.title}</h2>
                  {parentTask && <p className="mt-1 break-words text-sm text-[#111118]/70">Tugas: {parentTask.title}</p>}
                </div>
                <p className="text-sm leading-relaxed text-[#111118]/80">Target: {session.targetDescription}</p>
                <div className="rounded-[16px] bg-[#f0f6ff] p-4 text-sm leading-relaxed text-[#111118]/80">
                  <span className="text-[#111118]">Alasan contoh:</span> {session.reason}
                </div>
                {session.rescheduledTo && <p className="text-sm text-[#111118]/75">Sesi asal dipindah ke {displayDate(session.rescheduledTo.date)} pukul {session.rescheduledTo.startTime}.</p>}
              </div>

              <div className="flex flex-col items-start gap-3 border-t border-[#e1edff] pt-4">
                <Badge variant={isCompleted ? 'success' : isProposed ? 'active' : 'default'} size="sm">
                  {isProposed ? 'Perlu ditinjau' : isCompleted ? 'Selesai' : isInProgress ? 'Sedang dikerjakan' : isRescheduled ? 'Sesi asal dipindah' : isRejected ? 'Ditolak' : 'Terjadwal'}
                </Badge>
                {isProposed && <div className="flex w-full flex-col gap-2">
                  <PillButton size="sm" onClick={() => acceptSession(session.id)}><Check size={15} aria-hidden="true" />Terima usulan</PillButton>
                  <PillButton variant="outline" size="sm" onClick={() => rejectSession(session.id)}><X size={15} aria-hidden="true" />Tolak</PillButton>
                </div>}
                {session.status === 'scheduled' && <div className="flex w-full flex-col gap-2">
                  <PillButton variant="outline" size="sm" onClick={() => openRescheduleModal(session)}><RotateCcw size={15} aria-hidden="true" />Simulasikan sesi terlewat</PillButton>
                  <PillButton size="sm" onClick={() => startSession(session)}><CalendarClock size={15} aria-hidden="true" />Mulai sesi</PillButton>
                </div>}
                {isInProgress && <PillButton size="sm" onClick={() => completeSession(session.id, session.targetProgress)}><CheckCircle2 size={15} aria-hidden="true" />Tandai sesi selesai</PillButton>}
                {isRejected && <p className="max-w-48 text-right text-xs text-[#111118]/70">Usulan ini tidak masuk ke rencana belajar.</p>}
              </div>
            </div>
          </article>
        })}
      </div>}
    </div>
  )
}
