const skills = [
  'React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5', 'Framer Motion',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Git', 'Docker', 'Vercel',
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <h2>About</h2>
        <div className="about">
          <div className="portrait">
            <img src="/Profile_pic.jpeg" alt="Ayush Kirtania" loading="lazy" />
          </div>
          <div>
            <p>
              I&apos;m Ayush, a fourth-year Computer Science student at Scottish Church College in
              Kolkata. I build web apps across the stack, mostly with JavaScript, React, Next.js and
              Node.js, and I give real attention to the design side: typography, layout and motion.
            </p>
            <p>
              I&apos;m also building DRIPDUO, an independent clothing brand, and I made its website
              myself. Along the way I redesigned its typography for legibility, made the layout work
              well on phones, and built a loading animation that draws the brand&apos;s Bengali
              letter ড on a canvas.
            </p>
            <p>
              In December 2024 my team won the hackathon at the pre-conference workshop of ICDMAI
              2025 in Kolkata. Right now I&apos;m looking for internships and freelance projects in
              front-end or full stack development.
            </p>
            <div className="skills" aria-label="Skills and tools">
              {skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="langs">Fluent in English, Bengali and Hindi.</p>
          </div>
        </div>
      </div>
    </section>
  );
}