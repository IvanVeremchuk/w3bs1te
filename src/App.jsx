import { Routes, Route } from 'react-router-dom'
import LevaControls from './components/LevaControls'
import Navigation from './components/Navigation'
import ScrollToTop from './components/ScrollToTop'
import Home from './components/Home'
import Renders from './pages/Renders'
import GameArt from './pages/GameArt'
import Product from './pages/Product'
import Work from './pages/Work'
import Heraldic from './pages/Heraldic'

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <LevaControls />
      <ScrollToTop />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/renders" element={<Renders />} />
        <Route path="/game-art" element={<GameArt />} />
        <Route path="/product" element={<Product />} />
        <Route path="/work" element={<Work />} />
        <Route path="/heraldic" element={<Heraldic />} />
      </Routes>
    </div>
  )
}

export default App
