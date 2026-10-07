import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { PillButton } from '../ui/PillButton'

interface LoginViewProps {
  onEnterDemo: () => void
}

export const LoginView: React.FC<LoginViewProps> = ({ onEnterDemo }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onEnterDemo()
  }

  return (
    <main className="flex min-h-0 flex-1 items-center overflow-y-auto px-5 py-8 pt-[calc(2rem+env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-sm">
        <header className="mb-8">
          <p className="mb-8 text-2xl tracking-tight text-[#111118]">Stoodify</p>
          <p className="mb-2 font-mono text-xs text-[#111118]/70">RUANG BELAJAR SISWA</p>
          <h1 className="text-3xl leading-tight tracking-tight text-[#111118]">Masuk ke ruang belajarmu</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#111118]/75">
            Akses demo ini berjalan lokal. Tidak ada akun atau kata sandi yang diverifikasi.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm text-[#111118]">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nama@sekolah.sch.id"
              className="min-h-12 w-full rounded-[5000px] border border-[#e1edff] bg-white px-5 text-base text-[#111118] placeholder:text-[#111118]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm text-[#111118]">Kata sandi</label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                minLength={8}
                required
                placeholder="Minimal 8 karakter"
                className="min-h-12 w-full rounded-[5000px] border border-[#e1edff] bg-white py-3 pl-5 pr-14 text-base text-[#111118] placeholder:text-[#111118]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2727e6]"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-1 flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#111118]/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2727e6]"
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <PillButton type="submit" size="md" className="w-full">Masuk</PillButton>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-[#111118]/60" aria-hidden="true">
          <span className="h-px flex-1 bg-[#e1edff]" />
          <span>ATAU</span>
          <span className="h-px flex-1 bg-[#e1edff]" />
        </div>

        <PillButton type="button" variant="outline" size="md" className="w-full" onClick={onEnterDemo}>
          Masuk Demo
        </PillButton>
        <p className="mt-4 text-center text-xs leading-relaxed text-[#111118]/65">
          Prototype showcase dengan data contoh yang tersimpan di perangkat ini.
        </p>
      </div>
    </main>
  )
}
