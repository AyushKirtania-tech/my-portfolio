import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="wrap foot">
          <div className="foot-links">
            <a href="https://github.com/AyushKirtania-tech" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/ayush-kirtania-45464021a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/punkifiedayush/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div>© {new Date().getFullYear()} Ayush Kirtania</div>
        </div>
      </footer>
    </>
  );
}