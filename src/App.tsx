import { StoodifyProvider, useStoodify } from './context'
import { AnnouncementTicker } from './components/layout/AnnouncementTicker'
import { Navbar } from './components/layout/Navbar'
import { DecorativeShapes } from './components/layout/DecorativeShapes'
import { Footer } from './components/layout/Footer'

// Views
import { DashboardView } from './views/DashboardView'
import { TasksView } from './views/TasksView'
import { ScheduleView } from './views/ScheduleView'
import { PredictionsView } from './views/PredictionsView'
import { CalendarView } from './views/CalendarView'
import { RoadmapView } from './views/RoadmapView'

// Modals
import { AddTaskModal } from './components/showcase/AddTaskModal'
import { PriorityExplainerModal } from './components/showcase/PriorityExplainerModal'
import { RescheduleSimulatorModal } from './components/showcase/RescheduleSimulatorModal'
import { FocusTimerModal } from './components/showcase/FocusTimerModal'

const MainContent: React.FC = () => {
  const { activeView } = useStoodify()

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'tasks' && <TasksView />}
      {activeView === 'schedule' && <ScheduleView />}
      {activeView === 'predictions' && <PredictionsView />}
      {activeView === 'calendar' && <CalendarView />}
      {activeView === 'roadmap' && <RoadmapView />}
    </main>
  )
}

export function App() {
  return (
    <StoodifyProvider>
      <div className="min-h-screen flex flex-col bg-[#f0f6ff] text-[#111118] relative overflow-x-hidden">
        {/* Background Paper-cut Shapes Layer sesuai DESIGN.md */}
        <DecorativeShapes />

        {/* Top Announcement Ticker */}
        <AnnouncementTicker />

        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <MainContent />

        {/* Showcase Modals */}
        <AddTaskModal />
        <PriorityExplainerModal />
        <RescheduleSimulatorModal />
        <FocusTimerModal />

        {/* Micro-footer */}
        <Footer />
      </div>
    </StoodifyProvider>
  )
}

export default App
