import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

export const metadata = {
  title: 'Ayush Kirtania | Full Stack Developer',
  description: 'Full Stack Developer specializing in MERN stack. Building modern web applications with clean code and thoughtful design.',
  keywords: 'Ayush Kirtania, Full Stack Developer, MERN Stack, React, Node.js, MongoDB, Web Developer, Portfolio',
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer - Minimal Design */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Ayush Kirtania
            </div>

            <div className="flex gap-8">
              <a
                href="https://github.com/AyushKirtania-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-kirtania-45464021a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:ayushkirtania@gmail.com"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}