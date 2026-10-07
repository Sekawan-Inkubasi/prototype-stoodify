import React, { useState, useEffect } from 'react'
import type {
  StudentProfile,
  Subject,
  Task,
  StudySession,
  SchoolSchedule,
  RoutineActivity,
  TopicPrediction,
  TaskStatus,
} from '../types/stoodify'
import {
  initialProfile,
  initialSubjects,
  initialTasks,
  initialSessions,
  initialSchedules,
  initialRoutines,
  initialPredictions,
} from '../data/initialData'
import { StoodifyContext } from './context'
import type { ActiveView } from './context'
import { calculatePriority as calculateTaskPriority, refreshTaskPriority } from '../utils/priority'

export type { ActiveView }

const STORAGE_KEY = 'stoodify_prototype_state_v1'

const localDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY}_${key}`)
    const value = saved ? (JSON.parse(saved) as T) : fallback
    if (key === 'tasks' && Array.isArray(value)) return value.map((task) => refreshTaskPriority(task as Task)) as T
    return value
  } catch {
    return fallback
  }
}

const writeStored = (key: string, value: unknown) => {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${key}`, JSON.stringify(value))
  } catch {
    // The prototype stays usable when browser storage is unavailable.
  }
}

export const StoodifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => readStored('profile', initialProfile))

  const [subjects] = useState<Subject[]>(initialSubjects)

  const [tasks, setTasks] = useState<Task[]>(() => readStored('tasks', initialTasks))

  const [sessions, setSessions] = useState<StudySession[]>(() => readStored('sessions', initialSessions))

  const [schedules] = useState<SchoolSchedule[]>(initialSchedules)
  const [routines] = useState<RoutineActivity[]>(initialRoutines)

  const [predictions, setPredictions] = useState<TopicPrediction[]>(() => readStored('predictions', initialPredictions))

  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null)

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isPriorityExplainerOpen, setIsPriorityExplainerOpen] = useState(false)
  const [selectedSessionForAction, setSelectedSessionForAction] = useState<StudySession | null>(null)

  useEffect(() => {
    writeStored('profile', profile)
  }, [profile])

  useEffect(() => {
    writeStored('tasks', tasks)
  }, [tasks])

  useEffect(() => {
    writeStored('sessions', sessions)
  }, [sessions])

  useEffect(() => {
    writeStored('predictions', predictions)
  }, [predictions])

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ActiveView
      if (['dashboard', 'tasks', 'schedule', 'predictions', 'calendar', 'roadmap'].includes(hash)) {
        setActiveView(hash)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleSetActiveView = (view: ActiveView) => {
    setActiveView(view)
    window.location.hash = view
    document.querySelector<HTMLElement>('.mobile-content')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const calculatePriority = calculateTaskPriority

  const addTask = (
    title: string,
    subjectId: string,
    deadline: string,
    difficulty: number,
    estimatedDurationMinutes: number,
    type: Task['type'],
    description = ''
  ) => {
    const { score, priority, reason, breakdown } = calculatePriority(
      deadline,
      difficulty,
      estimatedDurationMinutes,
      0,
      type
    )

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      subjectId,
      description,
      deadline,
      difficulty,
      estimatedDurationMinutes,
      type,
      priority,
      priorityScore: score,
      priorityReason: reason,
      priorityBreakdown: breakdown,
      status: 'belum-mulai',
      progressPercent: 0,
      subtasks: [
        { id: `st-${Date.now()}-1`, title: 'Pahami instruksi & kumpulkan materi referensi', completed: false },
        { id: `st-${Date.now()}-2`, title: 'Pengerjaan draf utama tugas', completed: false },
        { id: `st-${Date.now()}-3`, title: 'Review akhir & finalisasi', completed: false },
      ],
      createdAt: new Date().toISOString(),
    }

    setTasks((prev) => [newTask, ...prev])

    // Tugas baru mendapat usulan sesi pada malam sebelum tenggat.
    const deadlineDate = new Date(`${deadline.split('T')[0]}T12:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (deadlineDate.getTime() > today.getTime()) deadlineDate.setDate(deadlineDate.getDate() - 1)
    const targetDate = localDate(deadlineDate)
    const newSession: StudySession = {
      id: `sess-${Date.now()}`,
      taskId: newTask.id,
      title: `Sesi Belajar: ${newTask.title}`,
      subjectId: newTask.subjectId,
      date: targetDate || localDate(new Date()),
      startTime: '19:00',
      endTime: '19:45',
      durationMinutes: Math.min(45, newTask.estimatedDurationMinutes),
      targetProgress: 50,
      targetDescription: 'Memulai tahap awal dan menyelesaikan subtask pertama.',
      priority: newTask.priority,
      reason: 'Contoh rekomendasi sesi berdasarkan prioritas tugas dan waktu belajar yang dipilih.',
      status: 'proposed',
      riskLevel: newTask.priority === 'sangat-tinggi' ? 'tinggi' : 'sedang',
    }

    setSessions((prev) => [...prev, newSession])
  }

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const progressPercent = status === 'selesai' ? 100 : t.progressPercent
          const calculated = calculatePriority(t.deadline, t.difficulty, t.estimatedDurationMinutes, progressPercent, t.type)
          return {
            ...t,
            status,
            progressPercent,
            priority: calculated.priority,
            priorityScore: calculated.score,
            priorityReason: calculated.reason,
            priorityBreakdown: calculated.breakdown,
            subtasks: status === 'selesai' ? t.subtasks.map((s) => ({ ...s, completed: true })) : t.subtasks,
          }
        }
        return t
      })
    )
  }

  const updateTaskProgress = (taskId: string, progress: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const clamped = Math.max(0, Math.min(100, progress))
          const newStatus: TaskStatus = clamped >= 100 ? 'selesai' : clamped > 0 ? 'sedang-dikerjakan' : 'belum-mulai'
          
          // Re-calculate priority with updated progress
          const { score, priority, reason, breakdown } = calculatePriority(
            t.deadline,
            t.difficulty,
            t.estimatedDurationMinutes,
            clamped,
            t.type
          )

          return {
            ...t,
            progressPercent: clamped,
            status: newStatus,
            priority,
            priorityScore: score,
            priorityReason: reason,
            priorityBreakdown: breakdown,
          }
        }
        return t
      })
    )
  }

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
          const completedCount = updatedSubtasks.filter((st) => st.completed).length
          const progressPercent = updatedSubtasks.length ? Math.round((completedCount / updatedSubtasks.length) * 100) : t.progressPercent
          const newStatus: TaskStatus = progressPercent >= 100 ? 'selesai' : progressPercent > 0 ? 'sedang-dikerjakan' : 'belum-mulai'
          const calculated = calculatePriority(t.deadline, t.difficulty, t.estimatedDurationMinutes, progressPercent, t.type)

          return {
            ...t,
            subtasks: updatedSubtasks,
            progressPercent,
            status: newStatus,
            priority: calculated.priority,
            priorityScore: calculated.score,
            priorityReason: calculated.reason,
            priorityBreakdown: calculated.breakdown,
          }
        }
        return t
      })
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    setSessions((prev) => prev.filter((s) => s.taskId !== taskId))
  }

  const startSession = (session: StudySession) => {
    setSessions((prev) => prev.map((item) => item.id === session.id && item.status === 'scheduled'
      ? { ...item, status: 'in-progress' }
      : item))
  }

  const completeSession = (sessionId: string, progressGained: number) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (session) {
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, status: 'completed' } : s))
      )
      // Update parent task
      const task = tasks.find((t) => t.id === session.taskId)
      if (task) {
        updateTaskProgress(task.id, Math.min(100, task.progressPercent + progressGained))
      }
    }
  }

  const acceptSession = (sessionId: string) => {
    setSessions((prev) => prev.map((session) => session.id === sessionId && session.status === 'proposed'
      ? { ...session, status: 'scheduled' }
      : session))
  }

  const rejectSession = (sessionId: string) => {
    setSessions((prev) => prev.map((session) => session.id === sessionId && session.status === 'proposed'
      ? { ...session, status: 'rejected' }
      : session))
  }

  const simulateReschedule = (sessionId: string) => {
    const targetSession = sessions.find((s) => s.id === sessionId)
    if (!targetSession) return

    const sessionDate = new Date(targetSession.date)
    sessionDate.setDate(sessionDate.getDate() + 1)
    const nextDate = localDate(sessionDate)

    const newStartTime = '20:15'
    const newEndTime = '21:00'

    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            status: 'rescheduled' as const,
            rescheduledTo: {
              date: nextDate,
              startTime: newStartTime,
              endTime: newEndTime,
              reason: 'Sesi terlewat. Contoh ini memindahkannya ke slot yang disediakan untuk demo.',
            },
          }
        }
        return s
      })

      // Jangan buat sesi pengganti ganda saat simulasi diulang.
      const existingNew = updated.find((s) => s.id === `${sessionId}-rescheduled`)
      if (!existingNew) {
        const rescheduledSession: StudySession = {
          ...targetSession,
          id: `${sessionId}-rescheduled`,
          date: nextDate,
          startTime: newStartTime,
          endTime: newEndTime,
          status: 'scheduled',
          reason: `Contoh penjadwalan ulang dari sesi ${targetSession.startTime}.`,
        }
        return [...updated, rescheduledSession]
      }
      return updated
    })

    setIsRescheduleModalOpen(false)
  }

  const givePredictionFeedback = (predictionId: string, feedback: 'correct' | 'incorrect') => {
    setPredictions((prev) =>
      prev.map((p) => (p.id === predictionId ? { ...p, userFeedback: feedback } : p))
    )
  }

  const resetToDefault = () => {
    localStorage.removeItem(`${STORAGE_KEY}_profile`)
    localStorage.removeItem(`${STORAGE_KEY}_tasks`)
    localStorage.removeItem(`${STORAGE_KEY}_sessions`)
    localStorage.removeItem(`${STORAGE_KEY}_predictions`)
    setProfile(initialProfile)
    setTasks(initialTasks.map(refreshTaskPriority))
    setSessions(initialSessions)
    setPredictions(initialPredictions)
    setActiveView('dashboard')
    window.location.hash = 'dashboard'
  }

  const openAddTask = () => setIsAddTaskModalOpen(true)
  const closeAddTask = () => setIsAddTaskModalOpen(false)

  const openPriorityExplainer = (task?: Task) => {
    if (task) setSelectedTaskForDetail(task)
    setIsPriorityExplainerOpen(true)
  }
  const closePriorityExplainer = () => setIsPriorityExplainerOpen(false)

  const openRescheduleModal = (session?: StudySession) => {
    if (session) setSelectedSessionForAction(session)
    setIsRescheduleModalOpen(true)
  }
  const closeRescheduleModal = () => setIsRescheduleModalOpen(false)

  return (
    <StoodifyContext.Provider
      value={{
        profile,
        subjects,
        tasks,
        sessions,
        schedules,
        routines,
        predictions,
        activeView,
        setActiveView: handleSetActiveView,
        selectedTaskForDetail,
        setSelectedTaskForDetail,
        selectedSessionForAction,
        isAddTaskModalOpen,
        isRescheduleModalOpen,
        isPriorityExplainerOpen,
        openAddTask,
        closeAddTask,
        openPriorityExplainer,
        closePriorityExplainer,
        openRescheduleModal,
        closeRescheduleModal,
        calculatePriority,
        addTask,
        updateTaskStatus,
        updateTaskProgress,
        toggleSubtask,
        deleteTask,
        startSession,
        completeSession,
        acceptSession,
        rejectSession,
        simulateReschedule,
        givePredictionFeedback,
        resetToDefault,
      }}
    >
      {children}
    </StoodifyContext.Provider>
  )
}
