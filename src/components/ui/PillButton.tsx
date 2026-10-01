import React from 'react'

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  withArrow?: boolean
  children: React.ReactNode
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-normal transition-all cursor-pointer select-none active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0'

  // Sesuai DESIGN.md: radius 48px, weight 400
  const sizeStyles = {
    sm: 'text-sm py-2 px-4 rounded-[48px] gap-1.5',
    md: 'text-base py-3 px-6 rounded-[48px] gap-2',
    lg: 'text-lg py-3.5 px-8 rounded-[48px] gap-2.5',
  }

  // Sesuai DESIGN.md:
  // Primary: fill #2727e6, text #ffffff, shadow 0 4px 0 0 #111118
  // Dark: fill #000000, text #ffffff, shadow 0 4px 0 0 #2727e6
  // Ghost: transparent, text #111118, underline on hover
  const variantStyles = {
    primary:
      'bg-[#2727e6] text-white hover:bg-[#1f1fc2] shadow-hard-cta',
    dark:
      'bg-[#000000] text-white hover:bg-[#1a1a24] shadow-hard-dark',
    ghost:
      'bg-transparent text-[#111118] hover:underline shadow-none py-2 px-3',
    outline:
      'bg-white text-[#111118] border border-[#e1edff] hover:bg-[#f0f6ff] shadow-hard-card',
    danger:
      'bg-[#ff4141] text-white hover:bg-[#e03030] shadow-hard-cta',
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>}
    </button>
  )
}
