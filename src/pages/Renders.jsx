import RenderGrid from '../components/RenderGrid'
import Footer from '../components/Footer'

function Renders() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white scroll-snap-container">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
        <RenderGrid />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Renders
