import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'default' | 'active' | 'priority-urgent' | 'priority-high' | 'priority-medium' | 'priority-low' | 'success' | 'warning' | 'mono'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs py-1 px-2.5 gap-1',
    md: 'text-sm py-1.5 px-3.5 gap-1.5',
  }

  // Sesuai DESIGN.md: 5000px radius, fill #e1edff, text #111118
  const variantStyles = {
    default: 'bg-[#e1edff] text-[#111118]',
    active: 'bg-[#2727e6] text-white',
    'priority-urgent': 'bg-[#ff4141] text-white',
    'priority-high': 'bg-[#ffda00] text-[#111118]',
    'priority-medium': 'bg-[#91d8ec] text-[#111118]',
    'priority-low': 'bg-[#e1edff] text-[#4b5563]',
    success: 'bg-[#16ab59] text-white',
    warning: 'bg-[#ffda00] text-[#111118]',
    mono: 'bg-[#111118] text-white font-mono tracking-tight',
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-[5000px] font-normal transition-colors select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
