import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Presentation from './components/Presentation'
import Gallery from './components/Gallery'
import Results from './components/Results'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Presentation />
        <Gallery />
        <Results />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
