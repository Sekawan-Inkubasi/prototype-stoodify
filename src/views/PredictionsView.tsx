import React from 'react'
import { BookOpen, CircleHelp, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useStoodify } from '../context'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export const PredictionsView: React.FC = () => {
  const { predictions, subjects, givePredictionFeedback } = useStoodify()
  const getSubject = (subjectId: string) => subjects.find((subject) => subject.id === subjectId)

  return <div className="relative z-10 space-y-8 text-left">
    <header className="max-w-3xl">
      <p className="mb-2 font-mono text-xs text-[#111118]/70">CONTOH PREDIKSI</p>
      <h1 className="text-3xl tracking-tight">Persiapan materi berikutnya</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#111118]/75">Lihat topik yang mungkin dibahas, alasan yang mendasari, dan materi yang bisa diulang. Prediksi adalah perkiraan, bukan kepastian.</p>
    </header>

    {predictions.length === 0 ? <Card className="space-y-2 text-sm leading-relaxed text-[#111118]/75">
      <p>Belum ada riwayat yang cukup untuk menampilkan contoh prediksi.</p>
      <p>PRD menyarankan minimal tiga tugas pada satu mata pelajaran sebelum membuat prediksi.</p>
    </Card> : <div className="space-y-5">
      {predictions.map((prediction) => {
        const subject = getSubject(prediction.subjectId)
        return <Card key={prediction.id} className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e1edff] pb-4">
            <div>
              <p className="text-sm text-[#111118]/75">{subject?.name ?? 'Mata pelajaran'}</p>
              <h2 className="mt-1 text-2xl tracking-tight">{prediction.predictedTopic}</h2>
            </div>
            <Badge variant="default" size="sm">Keyakinan contoh {prediction.confidencePercent}%</Badge>
          </div>

          <div className="grid gap-8[minmax(0,1.2fr)_minmax(220px,0.8fr)]">
            <div className="space-y-5">
              <section>
                <h3 className="mb-2 font-mono text-xs text-[#111118]/70">ALASAN PADA DATA CONTOH</h3>
                <p className="text-sm leading-relaxed text-[#111118]/85">{prediction.reason}</p>
              </section>
              <section>
                <h3 className="mb-2 font-mono text-xs text-[#111118]/70">RIWAYAT TOPIK</h3>
                <ol className="flex flex-wrap gap-2">
                  {prediction.recentTopics.map((topic, index) => <li key={`${topic}-${index}`} className="rounded-full bg-[#e1edff] px-3 py-1.5 text-sm text-[#111118]">{topic}</li>)}
                </ol>
              </section>
            </div>
            <aside className="space-y-5 border-t border-[#e1edff] pt-5">
              <section>
                <h3 className="mb-2 flex items-center gap-2 text-sm"><CircleHelp size={16} aria-hidden="true" />Materi yang bisa diulang</h3>
                <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-[#111118]/75">
                  {prediction.prerequisites.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section className="rounded-[16px] bg-[#f0f6ff] p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm"><BookOpen size={16} aria-hidden="true" />Saran persiapan</h3>
                <p className="text-sm leading-relaxed text-[#111118]/80">{prediction.preparationTips}</p>
              </section>
            </aside>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#e1edff] pt-4">
            <p className="text-sm text-[#111118]/75">Apakah topik ini sesuai dengan materi di kelas?</p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" aria-pressed={prediction.userFeedback === 'correct'} onClick={() => givePredictionFeedback(prediction.id, 'correct')} className={`min-h-11 rounded-[48px] border px-4 text-sm ${prediction.userFeedback === 'correct' ? 'border-[#2727e6] bg-[#2727e6] text-white' : 'border-[#e1edff] bg-white text-[#111118] hover:bg-[#f0f6ff]'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]`}>
                <ThumbsUp size={14} className="mr-2 inline" aria-hidden="true" />Sesuai
              </button>
              <button type="button" aria-pressed={prediction.userFeedback === 'incorrect'} onClick={() => givePredictionFeedback(prediction.id, 'incorrect')} className={`min-h-11 rounded-[48px] border px-4 text-sm ${prediction.userFeedback === 'incorrect' ? 'border-[#111118] bg-[#111118] text-white' : 'border-[#e1edff] bg-white text-[#111118] hover:bg-[#f0f6ff]'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]`}>
                <ThumbsDown size={14} className="mr-2 inline" aria-hidden="true" />Belum sesuai
              </button>
            </div>
          </div>
          {prediction.userFeedback && <p role="status" className="text-xs text-[#111118]/75">Feedback contoh tersimpan di perangkat ini.</p>}
        </Card>
      })}
    </div>}
  </div>
}
