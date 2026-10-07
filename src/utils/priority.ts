import type { PriorityBreakdown, Task, TaskPriority } from '../types/stoodify'

export const calculatePriority = (
  deadline: string,
  difficulty: number,
  durationMinutes: number,
  progressPercent: number,
  type: Task['type'] = 'individu',
) => {
  const differenceHours = (new Date(deadline).getTime() - Date.now()) / 3_600_000
  const urgencyScore = Math.round((differenceHours <= 0 ? 10 : differenceHours <= 24 ? 9 : differenceHours <= 48 ? 7 : differenceHours <= 72 ? 5 : differenceHours <= 120 ? 3 : 2) * 4)
  const difficultyScore = Math.round((Math.max(1, Math.min(5, difficulty)) / 5) * 20)
  const durationScore = Math.round((Math.min(180, Math.max(0, durationMinutes)) / 180) * 15)
  const importance = type === 'ulangan' ? 1 : type === 'proyek' ? 0.9 : ['individu', 'praktik', 'kelompok'].includes(type) ? 0.7 : 0.5
  const importanceScore = Math.round(importance * 15)
  const lateRiskScore = differenceHours < 72 && progressPercent < 20 ? 10 : 0
  const progressScore = Math.round((Math.max(0, Math.min(100, progressPercent)) / 100) * 15)
  const score = Math.max(0, Math.min(100, urgencyScore + difficultyScore + durationScore + importanceScore + lateRiskScore - progressScore))

  let priority: TaskPriority = 'rendah'
  if (score >= 80) priority = 'sangat-tinggi'
  else if (score >= 65) priority = 'tinggi'
  else if (score >= 45) priority = 'sedang'

  const remainingDays = Math.max(0, Math.ceil(differenceHours / 24))
  const reason = score >= 80
    ? `Tenggat ${remainingDays} hari lagi, kesulitan ${difficulty}/5, estimasi ${durationMinutes} menit, progres ${progressPercent}%.`
    : score >= 65
      ? `Tugas ini perlu mulai dicicil: tenggat ${remainingDays} hari lagi dengan estimasi ${durationMinutes} menit.`
      : score >= 45
        ? `Masih ada waktu untuk mengerjakannya bertahap. Estimasi pengerjaan ${durationMinutes} menit.`
        : `Tenggat masih relatif longgar dan progres saat ini ${progressPercent}%.`

  const breakdown: PriorityBreakdown = {
    urgencyScore,
    difficultyScore,
    durationScore,
    importanceScore,
    lateRiskScore,
    progressScore,
    totalScore: score,
  }

  return { score, priority, reason, breakdown }
}

export const refreshTaskPriority = (task: Task): Task => {
  const calculated = calculatePriority(task.deadline, task.difficulty, task.estimatedDurationMinutes, task.progressPercent, task.type)
  return { ...task, ...calculated, priorityScore: calculated.score, priorityReason: calculated.reason, priorityBreakdown: calculated.breakdown }
}
