import { createContext } from 'react'
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
  PriorityBreakdown,
} from '../types/stoodify'

export type ActiveView = 'dashboard' | 'tasks' | 'schedule' | 'predictions' | 'calendar' | 'roadmap'

export interface StoodifyContextType {
  profile: StudentProfile
  subjects: Subject[]
  tasks: Task[]
  sessions: StudySession[]
  schedules: SchoolSchedule[]
  routines: RoutineActivity[]
  predictions: TopicPrediction[]
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
  selectedTaskForDetail: Task | null
  setSelectedTaskForDetail: (task: Task | null) => void
  activeSessionRunning: StudySession | null
  selectedSessionForAction: StudySession | null

  // Modals
  isAddTaskModalOpen: boolean
  isRescheduleModalOpen: boolean
  isPriorityExplainerOpen: boolean
  isFocusTimerOpen: boolean
  openAddTask: () => void
  closeAddTask: () => void
  openPriorityExplainer: (task?: Task) => void
  closePriorityExplainer: () => void
  openRescheduleModal: (session?: StudySession) => void
  closeRescheduleModal: () => void
  openFocusTimer: (session?: StudySession) => void
  closeFocusTimer: () => void

  // Engine Actions
  calculatePriority: (
    deadline: string,
    difficulty: number,
    durationMinutes: number,
    progressPercent: number
  ) => {
    score: number
    priority: TaskPriority
    reason: string
    breakdown: PriorityBreakdown
  }
  addTask: (
    title: string,
    subjectId: string,
    deadline: string,
    difficulty: number,
    estimatedDurationMinutes: number,
    type: Task['type'],
    description?: string
  ) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  updateTaskProgress: (taskId: string, progress: number) => void
  toggleSubtask: (taskId: string, subtaskId: string) => void
  deleteTask: (taskId: string) => void

  // Session Actions
  startSession: (session: StudySession) => void
  completeSession: (sessionId: string, progressGained: number) => void
  simulateReschedule: (sessionId: string) => void

  // Prediction Actions
  givePredictionFeedback: (predictionId: string, feedback: 'correct' | 'incorrect') => void

  // Reset
  resetToDefault: () => void
}

export const StoodifyContext = createContext<StoodifyContextType | undefined>(undefined)
