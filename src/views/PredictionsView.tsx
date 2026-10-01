import React from 'react'
import {
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  BookOpen,
  Layers,
} from 'lucide-react'
import { useStoodify } from '../context'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export const PredictionsView: React.FC = () => {
  const { predictions, subjects, givePredictionFeedback } = useStoodify()

  const getSubject = (subjectId: string) => subjects.find((s) => s.id === subjectId)

  return (
    <div className="space-y-10 text-left relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-[#2727e6] text-white px-2.5 py-0.5 rounded-[5000px]">
              AI Topic Anticipation
            </span>
            <span className="text-xs text-[#111118]/60">Diferensiator Utama Stoodify</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#111118] font-normal tracking-tight">
            Prediksi Materi Selanjutnya
          </h1>
          <p className="text-sm text-[#111118]/70 mt-1 max-w-2xl font-normal leading-relaxed">
            Bukan hanya mencatat apa yang sudah ditugaskan. Stoodify menganalisis alur pembelajaran dan silabus Kurikulum Merdeka untuk memprediksi topik yang akan diajarkan guru berikutnya.
          </p>
        </div>
      </div>

      {/* Value Proposition Callout */}
      <div className="p-6 rounded-[24px] bg-[#f0f6ff] border border-[#2727e6]/30 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase text-[#2727e6]">Mengapa Ini Penting?</span>
          <h4 className="text-base text-[#111118] font-normal">Antisipasi, Bukan Sekadar Reaksi</h4>
          <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
            Siswa sering kaget saat materi baru diajarkan karena konsep prasyaratnya belum matang. Prediksi ini memberi waktu persiapan 2–3 hari lebih awal.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase text-[#16ab59]">Explainability</span>
          <h4 className="text-base text-[#111118] font-normal">Transparansi Alasan AI</h4>
          <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
            Sistem tidak sekadar menebak secara acak, melainkan menyajikan deretan tugas lampau dan silabus kurikulum sebagai dasar inferensi.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase text-[#ffda00]">Feedback Loop</span>
          <h4 className="text-base text-[#111118] font-normal">Model Fine-Tuning Mandiri</h4>
          <p className="text-xs text-[#111118]/70 leading-relaxed font-normal">
            Feedback siswa dicatat untuk mengukur akurasi prediksi kurikulum sekolah di Indonesia (Tanggung jawab AI Specialist 2).
          </p>
        </div>
      </div>

      {/* Predictions Cards */}
      <div className="space-y-6">
        {predictions.map((pred) => {
          const subj = getSubject(pred.subjectId)

          return (
            <Card key={pred.id} className="p-6 sm:p-8 space-y-6 bg-white border-[#e1edff] w-full">
              {/* Top Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1edff] pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-[5000px] text-white"
                    style={{ backgroundColor: subj?.color || '#2727e6' }}
                  >
                    {subj?.name} ({subj?.code})
                  </span>
                  <span className="text-xs text-[#111118]/60">Guru: {subj?.teacher}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#111118]/60">Tingkat Keyakinan AI:</span>
                  <Badge variant="active" size="sm" className="font-mono font-medium">
                    {pred.confidencePercent}% Confidence
                  </Badge>
                </div>
              </div>

              {/* Predicted Topic & Context */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Prediction & Past Topics */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#2727e6] tracking-wider block mb-1">
                      TOPIK YANG DIPREDIKSI BERIKUTNYA:
                    </span>
                    <h3 className="text-2xl text-[#111118] font-normal">{pred.predictedTopic}</h3>
                  </div>

                  {/* Past Topics Timeline */}
                  <div className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#e1edff] text-xs">
                    <span className="font-medium text-[#111118] block mb-2">
                      📜 Riwayat Materi & Tugas Terakhir Siswa:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pred.recentTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-[5000px] bg-white border border-[#e1edff] text-[#111118]"
                        >
                          {i + 1}. {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="p-4 rounded-[18px] bg-white border border-[#2727e6] shadow-hard-card text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#2727e6] font-medium">
                      <Sparkles size={14} />
                      <span>Dasar Inferensi Kurikulum Stoodify:</span>
                    </div>
                    <p className="text-[#111118]/80 leading-relaxed font-normal">{pred.reason}</p>
                  </div>
                </div>

                {/* Prerequisites & Actionable Tips */}
                <div className="space-y-4">
                  <div className="p-4 rounded-[18px] bg-[#f0f6ff] border border-[#e1edff] text-xs space-y-2">
                    <h4 className="font-medium text-[#111118] flex items-center gap-1.5">
                      <Layers size={14} className="text-[#ff4141]" />
                      <span>Materi Prasyarat Wajib:</span>
                    </h4>
                    <ul className="space-y-1.5 text-[#111118]/70">
                      {pred.prerequisites.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#2727e6]">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-[18px] bg-[#e8f7ee] border border-[#16ab59]/30 text-xs space-y-1.5">
                    <h4 className="font-medium text-[#16ab59] flex items-center gap-1.5">
                      <BookOpen size={14} />
                      <span>Tips Persiapan Awal:</span>
                    </h4>
                    <p className="text-[#111118]/80 leading-relaxed font-normal">
                      {pred.preparationTips}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feedback Loop Row */}
              <div className="pt-4 border-t border-[#e1edff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-[#111118]/70">
                  Apakah guru sudah/akan membahas materi ini di kelas?
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => givePredictionFeedback(pred.id, 'correct')}
                    className={`text-xs px-3.5 py-1.5 rounded-[5000px] border flex items-center gap-1.5 transition-all cursor-pointer ${
                      pred.userFeedback === 'correct'
                        ? 'bg-[#16ab59] text-white border-[#16ab59]'
                        : 'bg-[#f0f6ff] hover:bg-[#e1edff] text-[#111118] border-[#e1edff]'
                    }`}
                  >
                    <ThumbsUp size={13} />
                    <span>Prediksi Tepat</span>
                  </button>

                  <button
                    onClick={() => givePredictionFeedback(pred.id, 'incorrect')}
                    className={`text-xs px-3.5 py-1.5 rounded-[5000px] border flex items-center gap-1.5 transition-all cursor-pointer ${
                      pred.userFeedback === 'incorrect'
                        ? 'bg-[#ff4141] text-white border-[#ff4141]'
                        : 'bg-[#f0f6ff] hover:bg-[#e1edff] text-[#111118] border-[#e1edff]'
                    }`}
                  >
                    <ThumbsDown size={13} />
                    <span>Kurang Tepat</span>
                  </button>

                  {pred.userFeedback && (
                    <span className="text-[11px] text-[#16ab59] font-mono ml-1">
                      ✓ Umpan balik tersimpan
                    </span>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
