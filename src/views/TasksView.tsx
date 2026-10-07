import React, { useState } from 'react'
import {
  Plus,
  Calendar,
  Clock,
  Gauge,
  CheckCircle2,
  Trash2,
  Filter,
  CheckSquare,
  HelpCircle,
  Search,
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
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (selectedSubjectId !== 'all' && t.subjectId !== selectedSubjectId) return false
    if (searchTerm && !`${t.title} ${t.description ?? ''}`.toLocaleLowerCase('id').includes(searchTerm.toLocaleLowerCase('id'))) return false
    return true
  })

  const getSubject = (subjectId: string) => subjects.find((s) => s.id === subjectId)

  return (
    <div className="space-y-8 text-left relative z-10">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <h1 className="text-3xl text-[#111118] font-normal tracking-tight">
            Tugas & Prioritas Cerdas
          </h1>
          <p className="text-sm text-[#111118]/70 mt-1 max-w-xl">
            Skor contoh membantu membandingkan tenggat, kesulitan, durasi, dan progres tugas.
          </p>
        </div>

        <PillButton
          variant="primary"
          size="md"
          onClick={openAddTask}
          className="self-start w-full"
        >
          <Plus size={18} />
          <span>Tambah Tugas Baru</span>
        </PillButton>
      </div>

      {/* Filter Tabs & Subject Pill Selector */}
      <div className="flex flex-col justify-between gap-4 p-4 rounded-[24px] bg-white border border-[#e1edff] shadow-hard-card">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            aria-pressed={statusFilter === 'all'}
            className={`min-h-11 px-3.5 py-2 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'all'
                ? 'bg-[#2727e6] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Semua ({tasks.length})
          </button>
          <button
            onClick={() => setStatusFilter('belum-mulai')}
            aria-pressed={statusFilter === 'belum-mulai'}
            className={`min-h-11 px-3.5 py-2 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'belum-mulai'
                ? 'bg-[#2727e6] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Belum Mulai ({tasks.filter((t) => t.status === 'belum-mulai').length})
          </button>
          <button
            onClick={() => setStatusFilter('sedang-dikerjakan')}
            aria-pressed={statusFilter === 'sedang-dikerjakan'}
            className={`min-h-11 px-3.5 py-2 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'sedang-dikerjakan'
                ? 'bg-[#2727e6] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Sedang Dikerjakan ({tasks.filter((t) => t.status === 'sedang-dikerjakan').length})
          </button>
          <button
            onClick={() => setStatusFilter('selesai')}
            aria-pressed={statusFilter === 'selesai'}
            className={`min-h-11 px-3.5 py-2 rounded-[5000px] text-xs transition-colors cursor-pointer font-normal ${
              statusFilter === 'selesai'
                ? 'bg-[#16ab59] text-white'
                : 'bg-[#f0f6ff] text-[#111118] hover:bg-[#e1edff]'
            }`}
          >
            Selesai ({tasks.filter((t) => t.status === 'selesai').length})
          </button>
        </div>

        <div className="grid w-full grid-cols-1 gap-3">
          <label className="flex min-h-11 items-center gap-2 rounded-[5000px] border border-[#e1edff] bg-[#f0f6ff] px-4">
            <Search size={15} aria-hidden="true" className="shrink-0 text-[#111118]/70" />
            <span className="sr-only">Cari tugas</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Cari tugas" className="min-w-0 flex-1 bg-transparent text-sm text-[#111118] placeholder:text-[#111118]/65 focus:outline-none" />
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <Filter size={14} aria-hidden="true" className="shrink-0 text-[#111118]/70" />
            <span className="sr-only">Filter mata pelajaran</span>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="min-h-11 min-w-0 flex-1 rounded-[5000px] border border-[#e1edff] bg-[#f0f6ff] px-3 text-xs text-[#111118] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]"
          >
            <option value="all">Semua Mata Pelajaran</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          </label>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[24px] border border-[#e1edff]">
            <p className="mb-4 text-sm text-[#111118]/75">Tidak ada tugas yang cocok dengan filter ini.</p>
            {tasks.length === 0 ? <PillButton size="sm" onClick={openAddTask}>Tambahkan tugas</PillButton> : <button type="button" onClick={() => { setStatusFilter('all'); setSelectedSubjectId('all'); setSearchTerm('') }} className="min-h-11 text-sm text-[#2727e6] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]">Hapus filter</button>}
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
                <div className="flex flex-col justify-between gap-6">
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
                        className={`text-lg text-[#111118] font-normal ${
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
                        <CheckSquare size={13} className="text-[#111118]" />
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
                                  ? 'bg-[#e1edff] border-[#e1edff] text-[#111118]/70 line-through'
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
                  <div className="flex flex-col items-start justify-between border-t pt-4 border-[#e1edff] gap-4 min-w-[220px]">
                    {/* Priority Badge & Explainer Link */}
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
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
                        <HelpCircle size={12} />
                        <span>Mengapa skor ini?</span>
                      </button>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="w-full space-y-1">
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
                            ? 'bg-[#e1edff] text-[#111118] border-[#e1edff]'
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
                        type="button"
                        aria-label={`Hapus tugas ${task.title}`}
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

      {/* Formula note for the simulated priority score. */}
      <div className="p-6 rounded-[24px] bg-[#f0f6ff] border border-[#2727e6]/30 text-left space-y-2">
        <h4 className="text-base font-normal text-[#111118] flex items-center gap-2">
          <HelpCircle size={18} className="text-[#2727e6]" />
          <span>Cara membaca skor contoh</span>
        </h4>
        <p className="text-xs text-[#111118]/80 leading-relaxed font-normal">
          Kalkulasi lokal mengikuti faktor prioritas di dokumen perencanaan: {' '}
          <strong className="text-[#111118] font-medium">
            urgensi (40%), kesulitan (20%), durasi (15%), jenis tugas (15%), dan risiko terlambat (10%), dikurangi progres.
          </strong> Ini simulasi untuk showcase, bukan layanan AI aktif.
        </p>
      </div>
    </div>
  )
}
