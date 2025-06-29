import Hero from '@/components/Hero'
import WorkExperience from '@/components/WorkExperience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      <section id="experience" className='mt-10'>
        <WorkExperience />
      </section>
      <section id="projects" className='mt-10'>
        <Projects />
      </section>
      <section id="contact" className='mt-10'>
        <Contact />
      </section>
    </div>
  );
}
