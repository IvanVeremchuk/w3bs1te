import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import WindowsSite from './pages/WindowsSite'

const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))

function PortfolioFallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-gray-400">Loading 3D portfolio…</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<WindowsSite />} />
      <Route
        path="/3d-work"
        element={
          <Suspense fallback={<PortfolioFallback />}>
            <PortfolioPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
