import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm text-[#111118] mb-1.5 ml-3 font-normal"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-[#f0f6ff] border border-[#e1edff] rounded-[5000px] py-3 px-5 text-base text-[#111118] placeholder-[#111118]/40 outline-none transition-all focus:ring-2 focus:ring-[#2727e6] focus:ring-offset-2 focus:border-[#2727e6] disabled:opacity-50 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 ml-4 text-xs text-[#ff4141]">{error}</p>}
    </div>
  )
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  className = '',
  id,
  children,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm text-[#111118] mb-1.5 ml-3 font-normal"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none bg-[#f0f6ff] border border-[#e1edff] rounded-[5000px] py-3 px-5 text-base text-[#111118] outline-none transition-all focus:ring-2 focus:ring-[#2727e6] focus:ring-offset-2 focus:border-[#2727e6] cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#111118]">
          <span className="text-xs">▼</span>
        </div>
      </div>
      {error && <p className="mt-1 ml-4 text-xs text-[#ff4141]">{error}</p>}
    </div>
  )
}
