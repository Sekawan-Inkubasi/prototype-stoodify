import React, { useState } from 'react'
import {
  Plus,
  Sparkles,
  Calendar,
  Clock,
  Gauge,
  CheckCircle2,
  Trash2,
  Filter,
  CheckSquare,
  HelpCircle,
} from 'lucide-react'
import { useStoodify } from '../context'
import { Card } from '../components/ui/Card'
import { PillButton } from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'
import type { TaskStatus } from '../types/stoodify'

export const TasksView: React.FC = () => {
  const {
    tasks,
    subjects,
    openAddTask,
    openPriorityExplainer,
    updateTaskStatus,
    toggleSubtask,
    deleteTask,
  } = useStoodify()

  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all')
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all')

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (selectedSubjectId !== 'all' && t.subjectId !== selectedSubjectId) return false
    return true
  })

  const getSubject = (subjectId: string) => subjects.find((s) => s.id === subjectId)

  return (
    <div className="space-y-8 text-left relative z-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl text-[#111118] font-normal tracking-tight">
            Tugas & Prioritas Cerdas
          </h1>
          <p className="text-sm text-[#111118]/70 mt-1 max-w-xl">
            Stoodify menghitung skor prioritas multi-faktor secara otomatis agar kamu tahu persis tugas mana yang harus diselesaikan terlebih dahulu.
          </p>
        </div>

        <PillButton
          variant="primary"
          size="md"
          withArrow
          onClick={openAddTask}
          className="self-start sm:self-auto w-full sm:w-auto"
        >
          <Plus size={18} />
          <span>Tambah Tugas Baru</span>
        </PillButton>
      </div>

      {/* Filter Tabs & Subject Pill Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'all'
                ? 'bg-[#2727e6] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Semua ({tasks.length})
          </button>
          <button
            onClick={() => setStatusFilter('belum-mulai')}
            className={`px-3.5 py-1.5 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'belum-mulai'
                ? 'bg-[#2727e6] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Belum Mulai ({tasks.filter((t) => t.status === 'belum-mulai').length})
          </button>
          <button
            onClick={() => setStatusFilter('sedang-dikerjakan')}
            className={`px-3.5 py-1.5 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'sedang-dikerjakan'
                ? 'bg-[#2727e6] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Sedang Dikerjakan ({tasks.filter((t) => t.status === 'sedang-dikerjakan').length})
          </button>
          <button
            onClick={() => setStatusFilter('selesai')}
            className={`px-3.5 py-1.5 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'selesai'
                ? 'bg-[#16ab59] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Selesai ({tasks.filter((t) => t.status === 'selesai').length})
          </button>
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#111118]/60" />
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="text-xs bg-[#f0f6ff] border border-[#e1edff] rounded-[5000px] py-1.5 px-3 outline-none text-[#111118] cursor-pointer"
          >
            <option value="all">Semua Mata Pelajaran</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[24px] border border-[#e1edff]">
            <p className="text-[#111118]/60 text-sm">Tidak ada tugas dalam kategori ini.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const subj = getSubject(task.subjectId)
            const isCompleted = task.status === 'selesai'

            return (
              <Card
                key={task.id}
                className={`transition-all w-full ${isCompleted ? 'opacity-70 bg-[#fafcff]' : 'bg-white'}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column: Title & Meta */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-[5000px] text-white"
                        style={{ backgroundColor: subj?.color || '#2727e6' }}
                      >
                        {subj?.name}
                      </span>
                      <span className="text-xs text-[#111118]/70 flex items-center gap-1">
                        <Calendar size={13} className="text-[#ff4141]" />
                        Deadline: {new Date(task.deadline).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="text-xs text-[#111118]/40">•</span>
                      <span className="text-xs text-[#111118]/70 flex items-center gap-1">
                        <Clock size={13} className="text-[#2727e6]" />
                        {task.estimatedDurationMinutes} Menit
                      </span>
                      <span className="text-xs text-[#111118]/40">•</span>
                      <span className="text-xs text-[#111118]/70 flex items-center gap-1">
                        <Gauge size={13} className="text-[#ffda00]" />
                        Tingkat Kesulitan: {task.difficulty}/5
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-lg sm:text-xl text-[#111118] font-normal ${
                          isCompleted ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-xs text-[#111118]/70 mt-1 leading-relaxed max-w-2xl font-normal">
                          {task.description}
                        </p>
                      )}
                    </div>

                    {/* Subtask list */}
                    {task.subtasks.length > 0 && (
                      <div className="pt-1 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-[#111118]/60">
                          <CheckSquare size={13} className="text-[#2727e6]" />
                          <span>
                            Subtugas ({task.subtasks.filter((s) => s.completed).length}/
                            {task.subtasks.length}):
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {task.subtasks.map((st) => (
                            <button
                              key={st.id}
                              onClick={() => toggleSubtask(task.id, st.id)}
                              className={`text-xs px-2.5 py-1 rounded-[5000px] border flex items-center gap-1.5 transition-colors cursor-pointer ${
                                st.completed
                                  ? 'bg-[#e8f7ee] border-[#16ab59]/30 text-[#16ab59] line-through'
                                  : 'bg-[#f0f6ff] border-[#e1edff] text-[#111118] hover:bg-[#e1edff]'
                              }`}
                            >
                              <span className="text-[10px]">{st.completed ? '✓' : '○'}</span>
                              <span>{st.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: AI Score & Progress */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-[#e1edff] gap-4 min-w-[220px]">
                    {/* Priority Badge & Explainer Link */}
                    <div className="text-left sm:text-right lg:text-right">
                      <div className="flex items-center gap-1.5 sm:justify-end">
                        <Badge
                          variant={
                            task.priority === 'sangat-tinggi'
                              ? 'priority-urgent'
                              : task.priority === 'tinggi'
                              ? 'priority-high'
                              : task.priority === 'sedang'
                              ? 'priority-medium'
                              : 'priority-low'
                          }
                          size="md"
                        >
                          Skor {task.priorityScore} • {task.priority.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <button
                        onClick={() => openPriorityExplainer(task)}
                        className="text-xs text-[#2727e6] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Sparkles size={12} />
                        <span>Mengapa skor ini? (Breakdown) →</span>
                      </button>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="w-full sm:w-48 lg:w-full space-y-1">
                      <div className="flex justify-between text-xs text-[#111118]/70">
                        <span>Progres:</span>
                        <span className="font-mono text-[#2727e6]">{task.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#e1edff] h-2.5 rounded-[5000px] overflow-hidden">
                        <div
                          className="bg-[#2727e6] h-full rounded-[5000px] transition-all"
                          style={{ width: `${task.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Complete / Delete Actions */}
                    <div className="flex items-center gap-2 self-end">
                      <button
                        onClick={() =>
                          updateTaskStatus(task.id, isCompleted ? 'sedang-dikerjakan' : 'selesai')
                        }
                        className={`text-xs px-3 py-1.5 rounded-[5000px] border flex items-center gap-1 transition-colors cursor-pointer ${
                          isCompleted
                            ? 'bg-[#e8f7ee] text-[#16ab59] border-[#16ab59]'
                            : 'bg-white text-[#111118] border-[#e1edff] hover:bg-[#f0f6ff]'
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        <span>{isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus tugas "${task.title}"?`)) {
                            deleteTask(task.id)
                          }
                        }}
                        className="p-1.5 rounded-[5000px] text-gray-400 hover:text-[#ff4141] hover:bg-[#ffe8e8] transition-colors cursor-pointer"
                        title="Hapus tugas"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {/* Formula Info Callout Box (SuperHi Style) */}
      <div className="p-6 rounded-[24px] bg-[#f0f6ff] border border-[#2727e6]/30 text-left space-y-2">
        <h4 className="text-base font-normal text-[#111118] flex items-center gap-2">
          <HelpCircle size={18} className="text-[#2727e6]" />
          <span>Bagaimana AI Stoodify Menghitung Prioritas?</span>
        </h4>
        <p className="text-xs text-[#111118]/80 leading-relaxed font-normal">
          Berbeda dari to-do list umum yang hanya mengurutkan berdasarkan deadline, formula Stoodify menggabungkan:{' '}
          <strong className="text-[#111118] font-medium">
            (Urgensi Batas Waktu + Bobot Kesulitan + Durasi Pengerjaan + Risiko Keterlambatan) - Progres Saat Ini
          </strong>. Setiap kali kamu mencicil progres, prioritas tugas akan menyesuaikan secara dinamis.
        </p>
      </div>
    </div>
  )
}
