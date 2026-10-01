import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, CheckSquare } from 'lucide-react'
import { useStoodify } from '../../context'
import { Modal } from '../ui/Modal'
import { PillButton } from '../ui/PillButton'
import { Badge } from '../ui/Badge'
import type { StudySession } from '../../types/stoodify'

interface FocusTimerBodyProps {
  session: StudySession
}

const FocusTimerBody: React.FC<FocusTimerBodyProps> = ({ session }) => {
  const { tasks, subjects, toggleSubtask, completeSession } = useStoodify()

  const parentTask = tasks.find((t) => t.id === session.taskId)
  const subject = subjects.find((s) => s.id === session.subjectId)

  // Timer initialized directly with session duration
  const defaultDuration = (session.durationMinutes || 45) * 60
  const [secondsLeft, setSecondsLeft] = useState(defaultDuration)
  const [isActive, setIsActive] = useState(true)
  const progressGain = 30

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const handleToggleTimer = () => {
    setIsActive(!isActive)
  }

  const handleResetTimer = () => {
    setIsActive(false)
    setSecondsLeft(defaultDuration)
  }

  const handleFinishSession = () => {
    completeSession(session.id, progressGain)
  }

  return (
    <div className="space-y-6 text-center">
      {/* Session Info Header */}
      <div className="p-4 rounded-[20px] bg-[#f0f6ff] border border-[#e1edff] text-left">
        <div className="flex items-center justify-between mb-1.5">
          <Badge variant="active" size="sm">
            {subject?.name || 'Mata Pelajaran'}
          </Badge>
          <span className="text-xs font-mono text-[#111118]/60">
            Target: +{progressGain}% Progres
          </span>
        </div>
        <h3 className="text-lg text-[#111118] font-normal">{session.title}</h3>
        <p className="text-xs text-[#111118]/70 mt-1 leading-relaxed">
          🎯 {session.targetDescription}
        </p>
      </div>

      {/* Big Live Countdown Display */}
      <div className="p-8 rounded-[24px] bg-white border border-[#2727e6] shadow-hard-card relative overflow-hidden">
        <div className="text-6xl sm:text-7xl font-mono text-[#111118] tracking-wider mb-4 select-none">
          {formattedTime}
        </div>

        <div className="flex items-center justify-center gap-3">
          <PillButton
            variant={isActive ? 'dark' : 'primary'}
            size="md"
            onClick={handleToggleTimer}
            className="gap-2"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
            <span>{isActive ? 'Jeda Sesi' : 'Lanjutkan'}</span>
          </PillButton>

          <button
            onClick={handleResetTimer}
            className="w-12 h-12 rounded-[5000px] bg-[#f0f6ff] hover:bg-[#e1edff] text-[#111118] border border-[#e1edff] flex items-center justify-center transition-colors cursor-pointer"
            title="Reset Waktu"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Subtask Checklist */}
      {parentTask && parentTask.subtasks.length > 0 && (
        <div className="text-left p-4 rounded-[20px] bg-[#f0f6ff] border border-[#e1edff]">
          <h4 className="text-xs font-mono uppercase text-[#111118]/60 mb-2 flex items-center gap-1.5">
            <CheckSquare size={14} className="text-[#2727e6]" /> Subtugas Terkait:
          </h4>
          <div className="space-y-2">
            {parentTask.subtasks.map((st) => (
              <label
                key={st.id}
                onClick={() => toggleSubtask(parentTask.id, st.id)}
                className="flex items-center gap-2.5 p-2 rounded-[12px] bg-white border border-[#e1edff] text-xs text-[#111118] cursor-pointer hover:bg-[#fafcff]"
              >
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => {}}
                  className="w-4 h-4 accent-[#2727e6] rounded cursor-pointer"
                />
                <span className={st.completed ? 'line-through text-gray-400' : ''}>
                  {st.title}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Finish & Record Progress */}
      <div className="pt-2 border-t border-[#e1edff] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left text-xs text-[#111118]/70">
          Selesai lebih cepat? Catat pencapaianmu sekarang.
        </div>
        <PillButton
          variant="primary"
          onClick={handleFinishSession}
          withArrow
        >
          Selesaikan Sesi Ini & Catat Progres
        </PillButton>
      </div>
    </div>
  )
}

export const FocusTimerModal: React.FC = () => {
  const { isFocusTimerOpen, closeFocusTimer, activeSessionRunning } = useStoodify()

  if (!activeSessionRunning) return null

  return (
    <Modal
      isOpen={isFocusTimerOpen}
      onClose={closeFocusTimer}
      title="Sesi Belajar Aktif (Focus Mode)"
      subtitle="Fokus tanpa distraksi pada target sesi ini. Waktu belajar akan dicatat otomatis."
      maxWidth="md"
    >
      <FocusTimerBody key={activeSessionRunning.id} session={activeSessionRunning} />
    </Modal>
  )
}
