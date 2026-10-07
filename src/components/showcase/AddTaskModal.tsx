import React, { useState } from 'react'
import { Clock, Gauge } from 'lucide-react'
import { useStoodify } from '../../context'
import { Modal } from '../ui/Modal'
import { Input, Select } from '../ui/Input'
import { PillButton } from '../ui/PillButton'
import { Badge } from '../ui/Badge'
import type { TaskType } from '../../types/stoodify'

// Default deadline helper (3 days from now)
const getDefaultDeadline = () => {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return `${date}T23:59`
}

export const AddTaskModal: React.FC = () => {
  const { isAddTaskModalOpen, closeAddTask, subjects, addTask, calculatePriority } = useStoodify()

  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '')
  const [deadline, setDeadline] = useState(getDefaultDeadline)
  const [difficulty, setDifficulty] = useState(3)
  const [durationMinutes, setDurationMinutes] = useState(90)
  const [type, setType] = useState<TaskType>('individu')
  const [description, setDescription] = useState('')

  // Live priority calculation preview
  const livePriority = calculatePriority(deadline, difficulty, durationMinutes, 0, type)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !subjectId) return

    addTask(
      title.trim(),
      subjectId || subjects[0].id,
      deadline,
      difficulty,
      durationMinutes,
      type,
      description.trim()
    )

    // Reset and close
    setTitle('')
    setDescription('')
    setDifficulty(3)
    setDurationMinutes(90)
    closeAddTask()
  }

  const difficultyLabels = [
    '',
    '1: Sangat mudah',
    '2: Mudah',
    '3: Sedang',
    '4: Sulit',
    '5: Sangat kompleks',
  ]

  return (
    <Modal
      isOpen={isAddTaskModalOpen}
      onClose={closeAddTask}
      title="Tambah Tugas Baru"
      subtitle="Masukkan tugas untuk melihat perkiraan prioritas dan contoh usulan sesi belajar."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <Input
          label="Judul Tugas"
          placeholder="contoh: Laporan Praktikum Konfigurasi Web Server"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Subject & Type Grid */}
        <div className="grid grid-cols-1 gap-4">
          <Select
            label="Mata Pelajaran"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name} ({sub.code})
              </option>
            ))}
          </Select>

          <Select
            label="Jenis Tugas"
            value={type}
            onChange={(e) => setType(e.target.value as TaskType)}
          >
            <option value="individu">Tugas Individu</option>
            <option value="kelompok">Tugas Kelompok</option>
            <option value="praktik">Praktikum / Lab</option>
            <option value="proyek">Proyek Besar</option>
            <option value="ulangan">Persiapan Ulangan / Ujian</option>
            <option value="lainnya">Lainnya</option>
          </Select>
        </div>

        {/* Deadline & Duration Grid */}
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Batas Waktu (Deadline)"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <div className="text-left">
            <label className="block text-sm text-[#111118] mb-1.5 ml-3 font-normal">
              Estimasi Pengerjaan: <span className="font-mono text-[#2727e6]">{durationMinutes} Menit</span> ({Math.round(durationMinutes / 60 * 10) / 10} Jam)
            </label>
            <div className="flex items-center gap-3 bg-[#f0f6ff] border border-[#e1edff] rounded-[5000px] py-3 px-5">
              <Clock size={18} className="text-[#2727e6]" />
              <input
                type="range"
                min="15"
                max="360"
                step="15"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full accent-[#2727e6] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Difficulty Level Slider */}
        <div className="text-left">
          <div className="flex items-center justify-between mb-1.5 ml-3 mr-3 text-sm">
            <label className="text-[#111118] font-normal">Tingkat Kesulitan Materi</label>
            <span className="font-mono text-xs px-2 py-0.5 rounded-[5000px] bg-[#e1edff] text-[#2727e6]">
              {difficultyLabels[difficulty]}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-[#f0f6ff] border border-[#e1edff] rounded-[5000px] py-3 px-5">
            <Gauge size={18} className="text-[#ff4141]" />
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full accent-[#2727e6] cursor-pointer"
            />
          </div>
        </div>

        {/* Description */}
        <div className="text-left">
          <label className="block text-sm text-[#111118] mb-1.5 ml-3 font-normal">
            Catatan / Instruksi Guru (Opsional)
          </label>
          <textarea
            rows={2}
            className="w-full bg-[#f0f6ff] border border-[#e1edff] rounded-[20px] p-4 text-sm text-[#111118] placeholder-[#111118]/40 outline-none focus:ring-2 focus:ring-[#2727e6]"
            placeholder="contoh: Format PDF maksimal 5 halaman, kumpulkan via Google Classroom."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Live AI Priority Prediction Card */}
        <div className="p-4 rounded-[20px] bg-[#f0f6ff] border border-[#2727e6]/30 text-left">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gauge size={16} className="text-[#2727e6]" />
              <span className="text-sm font-normal text-[#111118]">Perkiraan prioritas lokal:</span>
            </div>
            <Badge
              variant={
                livePriority.priority === 'sangat-tinggi'
                  ? 'priority-urgent'
                  : livePriority.priority === 'tinggi'
                  ? 'priority-high'
                  : livePriority.priority === 'sedang'
                  ? 'priority-medium'
                  : 'priority-low'
              }
              size="sm"
            >
              Skor contoh {livePriority.score} • {livePriority.priority.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-[#111118]/80 leading-relaxed font-normal">
            {livePriority.reason} Tidak menggunakan model AI.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e1edff]">
          <PillButton
            type="button"
            variant="ghost"
            onClick={closeAddTask}
          >
            Batal
          </PillButton>
          <PillButton
            type="submit"
            variant="primary"
            withArrow
          >
            Simpan dan lihat usulan sesi
          </PillButton>
        </div>
      </form>
    </Modal>
  )
}
