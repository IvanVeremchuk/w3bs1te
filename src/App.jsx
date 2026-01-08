import { Routes, Route } from 'react-router-dom'
import LevaControls from './components/LevaControls'
import Navigation from './components/Navigation'
import ScrollToTop from './components/ScrollToTop'
import Home from './components/Home'
import GameArt from './pages/GameArt'
import Product from './pages/Product'

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <LevaControls />
      <ScrollToTop />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game-art" element={<GameArt />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
