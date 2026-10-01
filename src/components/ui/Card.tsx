import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'wash' | 'highlight' | 'danger'
  interactive?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  className = '',
  ...props
}) => {
  // Sesuai DESIGN.md:
  // white #ffffff surface, 24px radius, 1px #e1edff hairline border, 0 2px 0 0 #111118 hard shadow
  const variantStyles = {
    default: 'bg-white border-[#e1edff] shadow-hard-card',
    wash: 'bg-[#f0f6ff] border-[#e1edff] shadow-hard-card',
    highlight: 'bg-[#f0f6ff] border-[#2727e6] shadow-hard-cta',
    danger: 'bg-[#fff5f5] border-[#ffbac4] shadow-hard-card',
  }

  const interactiveStyles = interactive
    ? 'cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-hard-cta active:translate-y-0'
    : ''

  return (
    <div
      className={`rounded-[24px] border p-6 ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
