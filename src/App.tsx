import { useEffect, useState } from 'react'
import { StoodifyProvider, useStoodify } from './context'
import { Navbar } from './components/layout/Navbar'
import { DecorativeShapes } from './components/layout/DecorativeShapes'
import { LoginView } from './components/auth/LoginView'
import { SplashScreen } from './components/auth/SplashScreen'
import { DashboardView } from './views/DashboardView'
import { TasksView } from './views/TasksView'
import { ScheduleView } from './views/ScheduleView'
import { PredictionsView } from './views/PredictionsView'
import { CalendarView } from './views/CalendarView'
import { RoadmapView } from './views/RoadmapView'
import { AddTaskModal } from './components/showcase/AddTaskModal'
import { PriorityExplainerModal } from './components/showcase/PriorityExplainerModal'
import { RescheduleSimulatorModal } from './components/showcase/RescheduleSimulatorModal'

const MainContent: React.FC = () => {
  const { activeView } = useStoodify()

  return (
    <main className="mobile-content relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-[calc(5rem+env(safe-area-inset-bottom))]">
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'tasks' && <TasksView />}
      {activeView === 'schedule' && <ScheduleView />}
      {activeView === 'predictions' && <PredictionsView />}
      {activeView === 'calendar' && <CalendarView />}
      {activeView === 'roadmap' && <RoadmapView />}
    </main>
  )
}

const StoodifyApp: React.FC = () => {
  const { activeView, setActiveView } = useStoodify()
  const [showSplash, setShowSplash] = useState(true)
  const [demoEntered, setDemoEntered] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  const enterDemo = () => {
    setActiveView('dashboard')
    setDemoEntered(true)
  }

  const leaveDemo = () => {
    setActiveView('dashboard')
    setDemoEntered(false)
  }

  return (
    <div className="flex min-h-dvh justify-center bg-[#e6e9ef] md:items-center md:p-6">
      <div className="app-viewport @container relative isolate flex h-dvh min-h-dvh w-full max-w-[448px] flex-col overflow-hidden bg-[#f0f6ff] text-[#111118] md:h-[calc(100dvh-48px)] md:min-h-0 md:shadow-[0_0_0_1px_#cbd5e1]">
        {showSplash ? (
          <SplashScreen />
        ) : demoEntered ? (
          <>
            <DecorativeShapes />
            <Navbar onLogout={leaveDemo} />
            <MainContent key={activeView} />
            <AddTaskModal />
            <PriorityExplainerModal />
            <RescheduleSimulatorModal />
          </>
        ) : (
          <LoginView onEnterDemo={enterDemo} />
        )}
      </div>
    </div>
  )
}

export function App() {
  return (
    <StoodifyProvider>
      <StoodifyApp />
    </StoodifyProvider>
  )
}

export default App
