import { useContext } from 'react'
import { StoodifyContext } from './context'

export const useStoodify = () => {
  const context = useContext(StoodifyContext)
  if (!context) {
    throw new Error('useStoodify must be used within a StoodifyProvider')
  }
  return context
}
