const skills = [
  'React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'Framer Motion',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Git', 'Docker', 'Vercel',
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div className="portrait">
          <img src="/Profile_pic.jpeg" alt="Ayush Kirtania" loading="lazy" />
        </div>
        <div>
          <h2>About</h2>
          <p>
            I&apos;m Ayush, a Computer Science student at Scottish Church College in Kolkata. I turn
            product ideas into polished, production-ready web apps, mostly on the MERN stack, with
            clean architecture, accessibility, and performance in mind.
          </p>
          <p>
            I won a hackathon at ICDMAI 2025, which made me love fast collaboration and rapid
            prototyping. Outside of that I run DRIPDUO, my own clothing label, so I design for brands
            from the inside.
          </p>
          <div className="skills" aria-label="Skills and tools">
            {skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="langs">English (fluent), Bengali (native), Hindi (fluent)</p>
        </div>
      </div>
    </section>
  );
}