import React from 'react'
import { CalendarClock, ChevronRight, CircleHelp, Clock3, NotebookPen } from 'lucide-react'
import { useStoodify } from '../context'
import { Card } from '../components/ui/Card'
import { PillButton } from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'

const localDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const DashboardView: React.FC = () => {
  const { profile, tasks, sessions, subjects, predictions, setActiveView, openPriorityExplainer, openRescheduleModal, startSession } = useStoodify()
  const nextSession = [...sessions]
    .filter((session) => session.status === 'scheduled' && session.date >= localDate())
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))[0]
  const priorityTasks = [...tasks]
    .filter((task) => task.status !== 'selesai')
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3)
  const nextPrediction = predictions[0]
  const predictionSubject = subjects.find((subject) => subject.id === nextPrediction?.subjectId)

  return (
    <div className="relative z-10 space-y-10 text-left">
      <section className="mx-auto max-w-3xl py-6 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2727e6] text-white shadow-hard-card" aria-hidden="true">
          <CalendarClock size={22} />
        </div>
        <p className="mb-2 font-mono text-xs text-[#111118]/70">RENCANA BELAJAR</p>
        <h1 className="mb-4 text-3xl leading-tight tracking-tight text-[#111118]">
          {profile.name === 'Siswa contoh' ? 'Mulai dari tugas yang paling perlu dicicil.' : `Halo, ${profile.name.split(' ')[0]}. Mulai dari sini.`}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#111118]/75">
          Tinjau alasan prioritas, lalu pilih waktu belajar yang sesuai dengan jadwalmu.
        </p>
        <p className="mt-4 text-xs text-[#111118]/70">Tampilan ini menggunakan data contoh yang tersimpan di perangkat.</p>
      </section>

      <section aria-labelledby="next-session-title">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-xs text-[#111118]/70">SESI BERIKUTNYA</p>
            <h2 id="next-session-title" className="text-2xl tracking-tight">Waktu belajar yang disarankan</h2>
          </div>
          <button type="button" onClick={() => setActiveView('schedule')} className="inline-flex min-h-11 items-center gap-1 text-sm text-[#2727e6] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]">
            Semua sesi <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        {nextSession ? (
          <div className="rounded-[24px] border border-[#e1edff] bg-white p-5 shadow-hard-cta">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge variant="active" size="sm">{subjects.find((subject) => subject.id === nextSession.subjectId)?.name ?? 'Mata pelajaran'}</Badge>
              <Badge variant="mono" size="sm"><Clock3 size={13} aria-hidden="true" />{nextSession.date} · {nextSession.startTime}–{nextSession.endTime}</Badge>
            </div>
            <h3 className="mb-2 text-xl">{nextSession.title}</h3>
            <p className="max-w-2xl text-sm leading-relaxed text-[#111118]/80">Target sesi: {nextSession.targetDescription}</p>
            <div className="mt-5 rounded-[16px] bg-[#f0f6ff] p-4 text-sm leading-relaxed text-[#111118]/80">
              <span className="mr-1 text-[#111118]">Alasan contoh:</span>{nextSession.reason}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-[#e1edff] pt-5">
              <span className="text-xs text-[#111118]/70">Rekomendasi ini dapat diubah kapan saja.</span>
              <div className="flex flex-col gap-2">
                <PillButton variant="outline" size="sm" onClick={() => openRescheduleModal(nextSession)}>Simulasikan sesi terlewat</PillButton>
                <PillButton variant="primary" size="sm" onClick={() => startSession(nextSession)}>Mulai sesi</PillButton>
              </div>
            </div>
          </div>
        ) : (
          <Card className="text-center">
            <p className="mb-3 text-sm text-[#111118]/75">Belum ada sesi belajar yang akan datang.</p>
            <PillButton variant="primary" size="sm" onClick={() => setActiveView('tasks')}>Lihat tugas</PillButton>
          </Card>
        )}
      </section>

      <section className="grid grid-cols-1 gap-8[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
        <div>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 font-mono text-xs text-[#111118]/70">TUGAS AKTIF</p>
              <h2 className="text-2xl tracking-tight">Mulai dari prioritas tertinggi</h2>
            </div>
            <button type="button" onClick={() => setActiveView('tasks')} className="inline-flex min-h-11 items-center gap-1 text-sm text-[#2727e6] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]">
              Semua tugas <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
          {priorityTasks.length ? <div className="space-y-3">
            {priorityTasks.map((task) => {
              const subject = subjects.find((item) => item.id === task.subjectId)
              return <Card key={task.id} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#e1edff] px-3 py-1 text-xs text-[#111118]">{subject?.name ?? 'Mata pelajaran'}</span>
                  <Badge variant={task.priority === 'sangat-tinggi' ? 'priority-urgent' : task.priority === 'tinggi' ? 'priority-high' : 'default'} size="sm">Skor contoh {task.priorityScore}</Badge>
                </div>
                <h3 className="text-lg leading-snug">{task.title}</h3>
                <div className="flex items-center justify-between gap-3 text-xs text-[#111118]/75">
                  <span>Deadline {new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · progres {task.progressPercent}%</span>
                  <button type="button" onClick={() => openPriorityExplainer(task)} className="min-h-11 shrink-0 text-[#2727e6] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]">Alasan skor</button>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e1edff]" role="progressbar" aria-label={`Progres ${task.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={task.progressPercent}>
                  <div className="h-full rounded-full bg-[#2727e6]" style={{ width: `${task.progressPercent}%` }} />
                </div>
              </Card>
            })}
          </div> : <Card className="text-sm text-[#111118]/75">Semua tugas contoh sudah selesai. Tambahkan tugas baru untuk melihat prioritas.</Card>}
        </div>

        <aside className="border-t border-[#e1edff] pt-6">
          <div className="mb-4 flex items-center gap-2 text-[#2727e6]"><NotebookPen size={18} aria-hidden="true" /><p className="font-mono text-xs">PERSIAPAN MATERI</p></div>
          {nextPrediction ? <div className="space-y-4">
            <div>
              <p className="text-sm text-[#111118]/75">{predictionSubject?.name ?? 'Mata pelajaran'}</p>
              <h2 className="mt-1 text-2xl tracking-tight">{nextPrediction.predictedTopic}</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#111118]/80">{nextPrediction.reason}</p>
            <p className="text-sm text-[#111118]/75">Keyakinan contoh: {nextPrediction.confidencePercent}%</p>
            <button type="button" onClick={() => setActiveView('predictions')} className="inline-flex min-h-11 items-center gap-2 text-sm text-[#2727e6] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]">
              Lihat dasar dan saran <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div> : <p className="text-sm text-[#111118]/75">Belum ada data contoh untuk prediksi materi.</p>}
          <div className="mt-6 flex gap-2 border-t border-[#e1edff] pt-4 text-xs leading-relaxed text-[#111118]/70">
            <CircleHelp size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
            Prediksi adalah contoh, bukan kepastian. Siswa tetap menentukan langkah belajarnya.
          </div>
        </aside>
      </section>
    </div>
  )
}
