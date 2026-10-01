import React from 'react'
import {
  Sparkles,
  Clock,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Brain,
} from 'lucide-react'
import { useStoodify } from '../context'
import { Card } from '../components/ui/Card'
import { PillButton } from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'

const getTodayDate = () => new Date().toISOString().split('T')[0]

export const DashboardView: React.FC = () => {
  const {
    profile,
    tasks,
    sessions,
    subjects,
    predictions,
    setActiveView,
    openPriorityExplainer,
    openRescheduleModal,
    startSession,
  } = useStoodify()

  // Sesi hari ini yang belum selesai
  const [todayDate] = React.useState(getTodayDate)
  const todaySessions = sessions.filter((s) => s.date === todayDate && s.status !== 'completed')
  const nextSession = todaySessions[0] || sessions[0]

  // Top urgent tasks (sorted by priority score descending)
  const urgentTasks = [...tasks]
    .filter((t) => t.status !== 'selesai')
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3)

  // Subject lookup
  const getSubject = (subjectId: string) => subjects.find((s) => s.id === subjectId)

  return (
    <div className="space-y-12 text-left relative z-10">
      {/* 1. Hero Text Block Sesuai DESIGN.md */}
      <section className="text-center pt-8 pb-4 max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-[5000px] bg-[#2727e6] text-white flex items-center justify-center mx-auto mb-4 shadow-hard-card">
          <Sparkles size={24} />
        </div>
        <h1 className="text-3xl sm:text-5xl text-[#111118] tracking-tight font-normal leading-tight mb-4">
          Halo, {profile.name.split(' ')[0]}! Rencana belajarmu sudah siap.
        </h1>
        <p className="text-base sm:text-lg text-[#111118]/70 max-w-2xl mx-auto font-normal leading-relaxed mb-6">
          Stoodify telah menyelaraskan tugas sekolah, jadwal pelajaran, dan kegiatan rutinmu menjadi sesi belajar harian yang realistis tanpa rasa cemas.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {nextSession && (
            <PillButton
              variant="primary"
              size="md"
              withArrow
              onClick={() => startSession(nextSession)}
            >
              Mulai Sesi Belajar Terdekat
            </PillButton>
          )}
          <PillButton
            variant="dark"
            size="md"
            onClick={() => openRescheduleModal()}
          >
            ⚡ Simulasikan Reschedule AI
          </PillButton>
        </div>
      </section>

      {/* 2. Top Metric Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card variant="default" className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#111118]/60">Sesi Belajar Hari Ini</span>
            <div className="w-8 h-8 rounded-[5000px] bg-[#e1edff] flex items-center justify-center text-[#2727e6]">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-3xl font-mono text-[#111118] mb-1">
            {todaySessions.length} Sesi <span className="text-sm text-[#111118]/60 font-sans font-normal">(90 Menit)</span>
          </div>
          <p className="text-xs text-[#111118]/70">
            Terjadwal di jam santai malam: 19.00 - 20.45 WIB.
          </p>
        </Card>

        <Card variant="default" className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#111118]/60">Tugas Mendesak</span>
            <div className="w-8 h-8 rounded-[5000px] bg-[#ffe8e8] flex items-center justify-center text-[#ff4141]">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="text-3xl font-mono text-[#111118] mb-1">
            {urgentTasks.length} Tugas <span className="text-sm text-[#ff4141] font-sans font-normal">(Prioritas Tinggi)</span>
          </div>
          <p className="text-xs text-[#111118]/70">
            Dicicil per sesi agar tidak menumpuk H-1 deadline.
          </p>
        </Card>

        <Card variant="default" className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#111118]/60">Beban Belajar Siswa</span>
            <div className="w-8 h-8 rounded-[5000px] bg-[#e8f7ee] flex items-center justify-center text-[#16ab59]">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-3xl font-mono text-[#16ab59] mb-1">
            Terkendali <span className="text-sm text-[#111118]/60 font-sans font-normal">(Aman)</span>
          </div>
          <p className="text-xs text-[#111118]/70">
            Tidak ada bentrok jadwal sekolah atau kelelahan belajar.
          </p>
        </Card>
      </section>

      {/* 3. Highlighted Next Study Session Runner */}
      {nextSession && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl text-[#111118] font-normal">
                Sesi Belajar Selanjutnya
              </h2>
              <p className="text-xs sm:text-sm text-[#111118]/60">
                Sesi yang direkomendasikan AI untuk dikerjakan terlebih dahulu
              </p>
            </div>
            <button
              onClick={() => setActiveView('schedule')}
              className="text-xs sm:text-sm text-[#2727e6] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Lihat Semua Sesi</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#2727e6] shadow-hard-cta relative overflow-hidden">
            {/* Top Tag Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="active" size="md">
                  {getSubject(nextSession.subjectId)?.name || 'Mata Pelajaran'}
                </Badge>
                <Badge variant="mono" size="sm">
                  {nextSession.startTime} - {nextSession.endTime} ({nextSession.durationMinutes}m)
                </Badge>
              </div>
              <Badge
                variant={nextSession.priority === 'sangat-tinggi' ? 'priority-urgent' : 'priority-high'}
                size="sm"
              >
                {nextSession.priority.toUpperCase()}
              </Badge>
            </div>

            {/* Session Title & Target */}
            <h3 className="text-2xl sm:text-3xl text-[#111118] mb-2 font-normal">
              {nextSession.title}
            </h3>
            <p className="text-sm text-[#111118]/80 mb-6 leading-relaxed max-w-2xl">
              🎯 <strong className="font-medium text-[#111118]">Target Sesi:</strong> {nextSession.targetDescription}
            </p>

            {/* Explainable AI Note */}
            <div className="p-4 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff] mb-6 text-xs text-[#111118]/80 flex items-start gap-2.5">
              <Sparkles size={16} className="text-[#2727e6] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-[#111118]">Alasan Penjadwalan AI: </span>
                {nextSession.reason}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e1edff]">
              <div className="text-xs text-[#111118]/60">
                Waktu santai setelah sekolah & rutinitas pribadi
              </div>
              <div className="flex items-center gap-2">
                <PillButton
                  variant="outline"
                  size="sm"
                  onClick={() => openRescheduleModal(nextSession)}
                >
                  Lewati / Reschedule
                </PillButton>
                <PillButton
                  variant="primary"
                  size="md"
                  withArrow
                  onClick={() => startSession(nextSession)}
                >
                  Mulai Belajar Sekarang
                </PillButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Priority Tasks & Next Topic Anticipation Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Urgent Tasks List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl text-[#111118] font-normal">
                Tugas Prioritas Utama
              </h2>
              <p className="text-xs sm:text-sm text-[#111118]/60">
                Skor dihitung otomatis berdasarkan deadline, tingkat kesulitan, dan durasi
              </p>
            </div>
            <button
              onClick={() => setActiveView('tasks')}
              className="text-xs sm:text-sm text-[#2727e6] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Kelola Semua ({tasks.length})</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {urgentTasks.map((task) => {
              const subj = getSubject(task.subjectId)
              return (
                <Card
                  key={task.id}
                  interactive
                  onClick={() => openPriorityExplainer(task)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-mono px-2 py-0.5 rounded-[5000px] text-white"
                        style={{ backgroundColor: subj?.color || '#2727e6' }}
                      >
                        {subj?.code}
                      </span>
                      <span className="text-xs text-[#111118]/60">
                        Deadline: {new Date(task.deadline).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </span>
                      <span className="text-xs text-[#111118]/40">•</span>
                      <span className="text-xs text-[#111118]/60">
                        {task.estimatedDurationMinutes}m pengerjaan
                      </span>
                    </div>

                    <h4 className="text-base text-[#111118] font-normal leading-snug">
                      {task.title}
                    </h4>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 pt-1 max-w-xs">
                      <div className="w-full bg-[#e1edff] h-2 rounded-[5000px] overflow-hidden">
                        <div
                          className="bg-[#2727e6] h-full rounded-[5000px] transition-all"
                          style={{ width: `${task.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-[#111118]/70">
                        {task.progressPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#e1edff] gap-1">
                    <Badge
                      variant={
                        task.priority === 'sangat-tinggi'
                          ? 'priority-urgent'
                          : task.priority === 'tinggi'
                          ? 'priority-high'
                          : 'priority-medium'
                      }
                      size="sm"
                    >
                      Skor {task.priorityScore}
                    </Badge>
                    <span className="text-[11px] text-[#2727e6] hover:underline flex items-center gap-0.5">
                      Lihat Alasan AI →
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Right 1 Col: Next Topic Anticipation Teaser */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl text-[#111118] font-normal flex items-center gap-2">
              <Brain size={20} className="text-[#2727e6]" />
              <span>Prediksi Materi</span>
            </h2>
            <button
              onClick={() => setActiveView('predictions')}
              className="text-xs sm:text-sm text-[#2727e6] hover:underline cursor-pointer"
            >
              Detail →
            </button>
          </div>

          <Card variant="wash" className="space-y-4 border-[#2727e6]/30">
            <div className="flex items-center justify-between">
              <Badge variant="mono" size="sm">
                MATEMATIKA TERAPAN
              </Badge>
              <span className="text-xs font-mono text-[#2727e6] bg-[#e1edff] px-2 py-0.5 rounded-[5000px]">
                78% Keyakinan
              </span>
            </div>

            <div>
              <p className="text-xs text-[#111118]/60 uppercase font-mono mb-1">Topik Selanjutnya:</p>
              <h4 className="text-lg text-[#111118] font-normal">
                {predictions[0]?.predictedTopic}
              </h4>
            </div>

            <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
              Berdasarkan 3 tugas terakhir: <em>{predictions[0]?.recentTopics.join(', ')}</em>.
            </p>

            <div className="p-3 rounded-[16px] bg-white border border-[#e1edff] text-xs space-y-1">
              <span className="font-medium text-[#111118] block">💡 Saran Persiapan:</span>
              <p className="text-[#111118]/70 text-[11px] leading-relaxed">
                {predictions[0]?.preparationTips}
              </p>
            </div>

            <PillButton
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => setActiveView('predictions')}
            >
              Buka Semua Prediksi Mapel
            </PillButton>
          </Card>
        </div>
      </section>

      {/* 5. Incubation Showcase Banner */}
      <section className="p-6 sm:p-8 rounded-[24px] bg-[#111118] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-hard-card">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase bg-[#2727e6] text-white px-2.5 py-0.5 rounded-[5000px]">
              Diferensiator Utama
            </span>
            <span className="text-xs text-gray-400">Pameran Startup Pendidikan 2026</span>
          </div>
          <h3 className="text-2xl text-white font-normal">
            Bagaimana jika siswa melewatkan jadwal belajarnya?
          </h3>
          <p className="text-sm text-gray-300 max-w-xl font-normal leading-relaxed">
            Stoodify dilengkapi <strong>Adaptive Rescheduling Engine</strong> yang menghitung ulang slot kosong hari berikutnya tanpa membuat jadwal bentrok atau melewati batas deadline.
          </p>
        </div>

        <PillButton
          variant="primary"
          size="md"
          withArrow
          onClick={() => openRescheduleModal()}
          className="flex-shrink-0"
        >
          Coba Demo Rescheduling
        </PillButton>
      </section>
    </div>
  )
}
