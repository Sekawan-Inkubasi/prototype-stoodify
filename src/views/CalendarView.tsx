import React, { useState } from 'react'
import {
  Clock,
  BookOpen,
  CalendarClock,
} from 'lucide-react'
import { useStoodify } from '../context'
import { Badge } from '../components/ui/Badge'
import type { DayOfWeek } from '../types/stoodify'

export const CalendarView: React.FC = () => {
  const { schedules, routines, sessions, subjects } = useStoodify()

  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today')
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => {
    const day = new Date().toLocaleDateString('id-ID', { weekday: 'long' })
    return `${day[0].toLocaleUpperCase('id')}${day.slice(1)}` as DayOfWeek
  })

  const days: DayOfWeek[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

  const getSubject = (subjectId: string) => subjects.find((s) => s.id === subjectId)
  const getSessionsForDay = (day: DayOfWeek) => sessions.filter((session) => {
    const date = new Date(`${session.date}T12:00:00`)
    const weekday = date.toLocaleDateString('id-ID', { weekday: 'long' })
    return `${weekday[0].toLocaleUpperCase('id')}${weekday.slice(1)}` === day && !['completed', 'rejected'].includes(session.status)
  })

  // Filter items for selected day
  const daySchedules = schedules.filter((s) => s.dayOfWeek === selectedDay)
  const dayRoutines = routines.filter((r) => r.dayOfWeek === selectedDay)
  const daySessions = getSessionsForDay(selectedDay)

  return (
    <div className="space-y-8 text-left relative z-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-xs text-[#111118]/70">AGENDA DARI DATA CONTOH</p>
          <h1 className="text-3xl text-[#111118] font-normal tracking-tight">
            Kalender Belajar Terpadu
          </h1>
          <p className="text-sm text-[#111118]/70 mt-1 max-w-2xl font-normal leading-relaxed">
            Jadwal sekolah, kegiatan rutin, sesi belajar, dan deadline ditampilkan bersama. Kalender ini belum tersambung ke layanan eksternal.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-[5000px] border border-[#e1edff] shadow-hard-card self-start">
          <button
            type="button"
            onClick={() => setActiveTab('today')}
            aria-pressed={activeTab === 'today'}
            className={`min-h-11 px-4 py-2 rounded-[5000px] text-xs font-normal transition-colors cursor-pointer ${
              activeTab === 'today'
                ? 'bg-[#2727e6] text-white shadow-hard-card'
                : 'text-[#111118] hover:bg-[#f0f6ff]'
            }`}
          >
            Agenda Harian
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('week')}
            aria-pressed={activeTab === 'week'}
            className={`min-h-11 px-4 py-2 rounded-[5000px] text-xs font-normal transition-colors cursor-pointer ${
              activeTab === 'week'
                ? 'bg-[#2727e6] text-white shadow-hard-card'
                : 'text-[#111118] hover:bg-[#f0f6ff]'
            }`}
          >
            Mingguan (Senin–Jumat)
          </button>
        </div>
      </div>

      {/* Color Legend Row (SuperHi tokens) */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[20px] bg-white border border-[#e1edff] shadow-hard-card text-xs">
        <span className="font-mono text-[#111118]/60 uppercase text-[11px]">Lapisan Jadwal:</span>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[4px] bg-[#91d8ec]" />
          <span>Jadwal Sekolah (07.00 - 15.30)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[4px] bg-[#ffda00]" />
          <span>Kegiatan Rutin & Ekskul</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[4px] bg-[#ffbac4]" />
          <span>Waktu Istirahat / Keluarga</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[4px] bg-[#2727e6]" />
          <span className="text-[#2727e6] font-medium">Sesi belajar (waktu contoh)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[4px] bg-[#ff4141]" />
          <span className="text-[#ff4141]">Deadline Tugas</span>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              aria-pressed={isSelected}
            className={`min-h-11 px-5 py-2.5 rounded-[5000px] text-sm transition-colors cursor-pointer font-normal flex-shrink-0 ${
                isSelected
                  ? 'bg-[#2727e6] text-white shadow-hard-card'
                  : 'bg-white border border-[#e1edff] text-[#111118] hover:bg-[#f0f6ff]'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Agenda Timeline Display */}
      {activeTab === 'today' ? (
        <div className="space-y-4">
          <h3 className="text-xl text-[#111118] font-normal flex items-center gap-2">
            <Clock size={18} className="text-[#2727e6]" />
            <span>Alur Aktivitas Hari {selectedDay}</span>
          </h3>

          <div className="space-y-3">
            {/* 1. School Schedule Blocks */}
            <div className="p-5 rounded-[24px] bg-[#f0f6ff] border border-[#e1edff] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#111118]/70">
                <span className="flex items-center gap-1.5 uppercase font-medium text-[#2727e6]">
                  <BookOpen size={14} /> Jam Belajar di Sekolah
                </span>
                <span>07.00 - 15.30 WIB</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {daySchedules.map((sch) => {
                  const subj = getSubject(sch.subjectId)
                  return (
                    <div
                      key={sch.id}
                      className="p-3.5 rounded-[16px] bg-white border border-[#e1edff] text-xs space-y-1 shadow-xs w-full"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[#2727e6]">{sch.startTime} - {sch.endTime}</span>
                        <span className="text-[10px] bg-[#f0f6ff] px-2 py-0.5 rounded-[5000px] text-[#111118]/60">
                          {sch.room}
                        </span>
                      </div>
                      <h4 className="text-sm text-[#111118] font-normal">{subj?.name}</h4>
                      <p className="text-[11px] text-[#111118]/60">{sch.teacher}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 2. Routine Activities (Ekskul / Les) */}
            {dayRoutines.length > 0 && (
              <div className="p-5 rounded-[24px] bg-[#fffbe0] border border-[#ffda00] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#111118]/70">
                  <span className="flex items-center gap-1.5 uppercase font-medium text-[#111118]">
                    Kegiatan ekstrakurikuler dan rutinitas
                  </span>
                  <span>Sore Hari</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {dayRoutines.map((rt) => (
                    <div
                      key={rt.id}
                      className="p-3.5 rounded-[16px] bg-white border border-[#ffda00] text-xs space-y-1 w-full"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[#111118]">{rt.startTime} - {rt.endTime}</span>
                        <Badge variant="warning" size="sm">
                          {rt.type.toUpperCase()}
                        </Badge>
                      </div>
                      <h4 className="text-sm text-[#111118] font-normal">{rt.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Protected Dinner / Break buffer */}
            <div className="p-4 rounded-[20px] bg-[#fff0f3] border border-[#ffbac4] flex items-center justify-between text-xs text-[#111118]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#ff4141] font-medium">17.30 - 18.45 WIB</span>
                <span>Waktu Istirahat, Ibadah & Makan Malam Bersama Keluarga (Diblokir dari Jadwal Belajar)</span>
              </div>
                  <span className="text-[10px] font-mono text-[#111118]/70 uppercase">Waktu diblokir</span>
            </div>

            {/* 4. AI Recommended Study Sessions */}
            <div className="p-5 rounded-[24px] bg-white border-2 border-[#2727e6] shadow-hard-card space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 uppercase font-medium text-[#111118]">
                  <CalendarClock size={14} aria-hidden="true" /> Sesi belajar contoh
                </span>
                <span className="text-[#2727e6]">Waktu Produktif Malam</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {daySessions.map((sess) => {
                  const subj = getSubject(sess.subjectId)
                  return (
                    <div
                      key={sess.id}
                      className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#2727e6]/30 text-xs space-y-2 w-full"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[#2727e6] text-sm">
                          {sess.startTime} - {sess.endTime} ({sess.durationMinutes}m)
                        </span>
                        <Badge variant="active" size="sm">
                          {subj?.code}
                        </Badge>
                      </div>
                      <h4 className="text-sm text-[#111118] font-normal">{sess.title}</h4>
                      <p className="text-[11px] text-[#111118]/70 leading-relaxed">
                      Target: {sess.targetDescription}
                      </p>
                    </div>
                  )
                })}
                {daySessions.length === 0 && <p className="text-sm text-[#111118]/70">Belum ada sesi belajar contoh pada hari ini.</p>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Week View Grid */
        <div className="grid grid-cols-1 gap-4">
          {days.map((day) => {
            const daySch = schedules.filter((s) => s.dayOfWeek === day)
            const dayRt = routines.filter((r) => r.dayOfWeek === day)

            return (
              <div
                key={day}
                className="p-4 rounded-[20px] bg-white border border-[#e1edff] shadow-hard-card space-y-3"
              >
                <div className="border-b border-[#e1edff] pb-2 text-center">
                  <h4 className="text-base text-[#111118] font-normal">{day}</h4>
                  <span className="text-[10px] font-mono text-[#111118]/60 uppercase">
                    {daySch.length} Pelajaran
                  </span>
                </div>

                <div className="space-y-2">
                  {daySch.map((sch) => {
                    const subj = getSubject(sch.subjectId)
                    return (
                      <div
                        key={sch.id}
                        className="p-3 rounded-[16px] bg-[#f0f6ff] border border-[#e1edff] text-[11px] space-y-0.5"
                      >
                        <div className="font-mono text-[#2727e6] text-[10px]">
                          {sch.startTime} - {sch.endTime}
                        </div>
                        <div className="text-[#111118] font-normal truncate">{subj?.name}</div>
                      </div>
                    )
                  })}

                  {dayRt.map((rt) => (
                    <div
                      key={rt.id}
                      className="p-3 rounded-[16px] bg-[#fffbe0] border border-[#ffda00] text-[11px] space-y-0.5"
                    >
                      <div className="font-mono text-[#111118] text-[10px]">
                        {rt.startTime} - {rt.endTime}
                      </div>
                      <div className="text-[#111118] font-normal truncate">{rt.title}</div>
                    </div>
                  ))}
                  {getSessionsForDay(day).map((session) => <div key={session.id} className="space-y-1 rounded-[16px] border border-[#2727e6] bg-[#f0f6ff] p-3 text-xs">
                    <div className="font-mono text-[#111118]">{session.startTime} - {session.endTime}</div>
                    <div className="break-words text-[#111118]">{session.title}</div>
                    <span className="text-[#111118]/70">Sesi contoh</span>
                  </div>)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
