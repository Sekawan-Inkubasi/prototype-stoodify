export type TaskPriority = 'sangat-tinggi' | 'tinggi' | 'sedang' | 'rendah'

export type TaskStatus = 'belum-mulai' | 'sedang-dikerjakan' | 'selesai' | 'terlambat'

export type TaskType = 'individu' | 'kelompok' | 'praktik' | 'proyek' | 'ulangan' | 'lainnya'

export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface PriorityBreakdown {
  urgencyScore: number
  difficultyScore: number
  durationScore: number
  importanceScore: number
  lateRiskScore: number
  progressScore: number
  totalScore: number
}

export interface Subject {
  id: string
  name: string
  code: string
  teacher: string
  color: string // Tailwind color or hex
  accentBg: string
  iconName: string
  generalDifficulty: 'mudah' | 'sedang' | 'sulit'
}

export interface Task {
  id: string
  title: string
  subjectId: string
  description?: string
  deadline: string // ISO string or YYYY-MM-DDTHH:mm
  difficulty: number // 1 - 5
  estimatedDurationMinutes: number
  type: TaskType
  priority: TaskPriority
  priorityScore: number
  priorityReason: string
  priorityBreakdown: PriorityBreakdown
  status: TaskStatus
  progressPercent: number
  subtasks: Subtask[]
  createdAt: string
}

export type StudySessionStatus = 'proposed' | 'scheduled' | 'in-progress' | 'completed' | 'skipped' | 'rescheduled' | 'rejected'

export interface StudySession {
  id: string
  taskId: string
  title: string
  subjectId: string
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string // HH:mm
  durationMinutes: number
  targetProgress: number // target completion percentage
  targetDescription: string
  priority: TaskPriority
  reason: string
  status: StudySessionStatus
  riskLevel: 'rendah' | 'sedang' | 'tinggi'
  rescheduledTo?: {
    date: string
    startTime: string
    endTime: string
    reason: string
  }
}

export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu'

export interface SchoolSchedule {
  id: string
  dayOfWeek: DayOfWeek
  subjectId: string
  startTime: string
  endTime: string
  room: string
  teacher: string
}

export interface RoutineActivity {
  id: string
  title: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  type: 'ekskul' | 'les' | 'istirahat' | 'pribadi'
  color: string
}

export interface TopicPrediction {
  id: string
  subjectId: string
  recentTopics: string[]
  predictedTopic: string
  confidencePercent: number
  reason: string
  prerequisites: string[]
  preparationTips: string
  userFeedback?: 'correct' | 'incorrect' | null
}

export interface StudentProfile {
  name: string
  avatarUrl?: string
  school: string
  grade: string
  major: string
  preferredStudyHours: {
    start: string // e.g. "18:30"
    end: string   // e.g. "21:30"
  }
  idealSessionDurationMinutes: number
  breakDurationMinutes: number
  maxSessionsPerDay: number
}
