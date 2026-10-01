import React, { useState, useEffect } from 'react'
import type {
  StudentProfile,
  Subject,
  Task,
  StudySession,
  SchoolSchedule,
  RoutineActivity,
  TopicPrediction,
  TaskPriority,
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

export type { ActiveView }

const STORAGE_KEY = 'stoodify_prototype_state_v1'

export const StoodifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`)
    return saved ? JSON.parse(saved) : initialProfile
  })

  const [subjects] = useState<Subject[]>(initialSubjects)

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`)
    return saved ? JSON.parse(saved) : initialTasks
  })

  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_sessions`)
    return saved ? JSON.parse(saved) : initialSessions
  })

  const [schedules] = useState<SchoolSchedule[]>(initialSchedules)
  const [routines] = useState<RoutineActivity[]>(initialRoutines)

  const [predictions, setPredictions] = useState<TopicPrediction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_predictions`)
    return saved ? JSON.parse(saved) : initialPredictions
  })

  // Navigation & UI States
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null)
  const [activeSessionRunning, setActiveSessionRunning] = useState<StudySession | null>(null)

  // Modals
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isPriorityExplainerOpen, setIsPriorityExplainerOpen] = useState(false)
  const [isFocusTimerOpen, setIsFocusTimerOpen] = useState(false)
  const [selectedSessionForAction, setSelectedSessionForAction] = useState<StudySession | null>(null)

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sessions`, JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_predictions`, JSON.stringify(predictions))
  }, [predictions])

  // Sync hash routing if desired
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Multi-factor Explainable AI Priority Calculation Formula
  const calculatePriority = (
    deadline: string,
    difficulty: number,
    durationMinutes: number,
    progressPercent: number
  ) => {
    const now = new Date()
    const targetDate = new Date(deadline)
    const diffHours = (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    // 1. Urgency score (max 40)
    let urgencyScore = 10
    if (diffHours <= 0) {
      urgencyScore = 40
    } else if (diffHours <= 24) {
      urgencyScore = 38
    } else if (diffHours <= 48) {
      urgencyScore = 30
    } else if (diffHours <= 72) {
      urgencyScore = 22
    } else if (diffHours <= 120) {
      urgencyScore = 15
    } else {
      urgencyScore = 8
    }

    // 2. Difficulty score (max 25)
    const difficultyScore = Math.min(25, difficulty * 5)

    // 3. Duration score (max 20)
    const durationScore = Math.min(20, Math.round((durationMinutes / 180) * 20))

    // 4. Late risk score (max 20)
    let lateRiskScore = 10
    if (diffHours < 36 && durationMinutes >= 120) {
      lateRiskScore = 20
    } else if (diffHours < 48 && durationMinutes >= 90) {
      lateRiskScore = 16
    } else if (diffHours < 72) {
      lateRiskScore = 12
    } else {
      lateRiskScore = 6
    }

    // 5. Progress reduction (max 15)
    const progressScore = Math.round((progressPercent / 100) * 15)

    // Total calculation
    const totalScore = Math.max(10, Math.min(100, urgencyScore + difficultyScore + durationScore + lateRiskScore - progressScore))

    let priority: TaskPriority = 'rendah'
    let reason = ''

    if (totalScore >= 80) {
      priority = 'sangat-tinggi'
      reason = `Prioritas Sangat Tinggi karena sisa batas waktu tersisa ${Math.max(1, Math.round(diffHours / 24))} hari dengan estimasi pengerjaan ${Math.round(durationMinutes / 60)} jam dan tingkat kesulitan level ${difficulty}/5.`
    } else if (totalScore >= 65) {
      priority = 'tinggi'
      reason = `Prioritas Tinggi mengingat beban tugas cukup signifikan (${durationMinutes} menit) dan perlu dicicil lebih awal sebelum jadwal menumpuk.`
    } else if (totalScore >= 45) {
      priority = 'sedang'
      reason = `Prioritas Sedang karena tenggat waktu masih cukup proporsional dengan estimasi waktu pengerjaan (${durationMinutes} menit).`
    } else {
      priority = 'rendah'
      reason = `Prioritas Rendah karena batas waktu pengumpulan masih relatif panjang dan tingkat kesulitan tergolong ringan.`
    }

    return {
      score: totalScore,
      priority,
      reason,
      breakdown: {
        urgencyScore,
        difficultyScore,
        durationScore,
        lateRiskScore,
        progressScore,
        totalScore,
      },
    }
  }

  // Task Actions
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
      0
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

    // Otomatis buat rekomendasi sesi belajar untuk tugas ini di slot malam
    const targetDate = deadline.split('T')[0]
    const newSession: StudySession = {
      id: `sess-${Date.now()}`,
      taskId: newTask.id,
      title: `Sesi Belajar: ${newTask.title}`,
      subjectId: newTask.subjectId,
      date: targetDate || new Date().toISOString().split('T')[0],
      startTime: '19:00',
      endTime: '19:45',
      durationMinutes: Math.min(45, newTask.estimatedDurationMinutes),
      targetProgress: 50,
      targetDescription: 'Memulai tahap awal dan menyelesaikan subtask pertama.',
      priority: newTask.priority,
      reason: 'Sesi otomatis dijadwalkan oleh AI Stoodify sesuai jam belajar pilihanmu (19.00 - 21.45).',
      status: 'scheduled',
      riskLevel: newTask.priority === 'sangat-tinggi' ? 'tinggi' : 'sedang',
    }

    setSessions((prev) => [...prev, newSession])
  }

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const progressPercent = status === 'selesai' ? 100 : t.progressPercent
          return {
            ...t,
            status,
            progressPercent,
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
            clamped
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
          const progressPercent = Math.round((completedCount / updatedSubtasks.length) * 100)
          const newStatus: TaskStatus = progressPercent >= 100 ? 'selesai' : progressPercent > 0 ? 'sedang-dikerjakan' : 'belum-mulai'

          return {
            ...t,
            subtasks: updatedSubtasks,
            progressPercent,
            status: newStatus,
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

  // Session Runner & Rescheduling
  const startSession = (session: StudySession) => {
    setActiveSessionRunning(session)
    setIsFocusTimerOpen(true)
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
    setIsFocusTimerOpen(false)
    setActiveSessionRunning(null)
  }

  // Adaptive Rescheduling Simulator (Core Showcase Differentiator)
  const simulateReschedule = (sessionId: string) => {
    const targetSession = sessions.find((s) => s.id === sessionId)
    if (!targetSession) return

    // Temukan hari berikutnya
    const sessionDate = new Date(targetSession.date)
    sessionDate.setDate(sessionDate.getDate() + 1)
    const nextDate = sessionDate.toISOString().split('T')[0]

    const newStartTime = '20:15'
    const newEndTime = '21:00'

    // Tandai sesi lama sebagai skipped/rescheduled dan buat sesi kompensasi
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
              reason: 'Sesi hari ini dilewati siswa. AI menyusun ulang ke slot bebas besok tanpa bentrok jadwal sekolah atau melampaui deadline.',
            },
          }
        }
        return s
      })

      // Tambahkan sesi reschedule baru jika belum ada
      const existingNew = updated.find((s) => s.id === `${sessionId}-rescheduled`)
      if (!existingNew) {
        const rescheduledSession: StudySession = {
          ...targetSession,
          id: `${sessionId}-rescheduled`,
          date: nextDate,
          startTime: newStartTime,
          endTime: newEndTime,
          status: 'scheduled',
          reason: `Hasil Adaptive Rescheduling dari sesi ${targetSession.startTime}. Dipindahkan ke jam 20.15 tanpa bentrok jam sekolah.`,
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
    setTasks(initialTasks)
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

  const openFocusTimer = (session?: StudySession) => {
    if (session) setActiveSessionRunning(session)
    setIsFocusTimerOpen(true)
  }
  const closeFocusTimer = () => setIsFocusTimerOpen(false)

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
        activeSessionRunning,
        selectedSessionForAction,
        isAddTaskModalOpen,
        isRescheduleModalOpen,
        isPriorityExplainerOpen,
        isFocusTimerOpen,
        openAddTask,
        closeAddTask,
        openPriorityExplainer,
        closePriorityExplainer,
        openRescheduleModal,
        closeRescheduleModal,
        openFocusTimer,
        closeFocusTimer,
        calculatePriority,
        addTask,
        updateTaskStatus,
        updateTaskProgress,
        toggleSubtask,
        deleteTask,
        startSession,
        completeSession,
        simulateReschedule,
        givePredictionFeedback,
        resetToDefault,
      }}
    >
      {children}
    </StoodifyContext.Provider>
  )
}
