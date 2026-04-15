import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import AuthPage from './pages/authpages/AuthPage'
import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/Profile'
import Tracker from './pages/Tracker'
import Workouts from './pages/Workouts'
import WorkoutDetailPage from './pages/WorkoutDetailPage'

function App() {
  return (
    
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<><Navbar /><Dashboard /></>} />
        <Route path="/workouts" element={<><Navbar /><Workouts /></>} />
        <Route path="/workouts/:id" element={<><Navbar /><WorkoutDetailPage /></>} />
        <Route path="/tracker" element={<><Navbar /><Tracker /></>} />
        <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   
  )
}

export default App



