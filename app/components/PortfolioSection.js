import Image from 'next/image'
import { useTheme } from '../hooks/useTheme'
import { GithubLogoIcon, GlobeIcon, PlayIcon } from '@phosphor-icons/react'

const projects = [
  {
    title: "Travel Blog Platform",
    description: "A dynamic blogging platform for travelers to share their adventures with interactive maps, real-time collaboration, and AI-powered content suggestions.",
    image: "https://images.pexels.com/photos/3467159/pexels-photo-3467159.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    alt: "Travel Blog Platform Preview",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    github: "https://github.com/username/travel-blog",
    live: "https://travel-blog-demo.com",
    metrics: { users: "10K+", performance: "98%", uptime: "99.9%" }
  },
  {
    title: "Fitness Tracker App",
    description: "A comprehensive fitness tracking application with real-time analytics, social features, and ML-powered workout recommendations.",
    image: "https://images.pexels.com/photos/3822907/pexels-photo-3822907.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    alt: "Fitness Tracker App Preview",
    tech: ["React Native", "Node.js", "MongoDB", "TensorFlow"],
    github: "https://github.com/username/fitness-tracker",
    live: "https://fitness-app-demo.com",
    metrics: { users: "25K+", performance: "95%", uptime: "99.8%" }
  },
  {
    title: "Recipe Sharing Site",
    description: "A community-driven platform for sharing and discovering recipes with AI-powered meal planning and nutritional analysis.",
    image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    alt: "Recipe Sharing Site Preview",
    tech: ["Vue.js", "Express", "Redis", "Docker"],
    github: "https://github.com/username/recipe-platform",
    live: "https://recipe-demo.com",
    metrics: { users: "15K+", performance: "97%", uptime: "99.7%" }
  },
]

export default function PortfolioSection() {
  const { getStrokeStyle } = useTheme()

  return (
    <section className="section">
      {/* Large Background Title */}
      <div className="background_title_div">
        <h2 className="background_title" style={getStrokeStyle()}>
          PORTFOLIO
        </h2>
        <div className="section_title">
          <span className="text-glow">// PORTFOLIO</span>
        </div>
      </div>

      <h2 className="section_heading">
        My Latest Works
      </h2>

      <p className="section_body_text">
        Diving deep into passion projects and open-source realms, my portfolio is where creativity and code collide! 🚀💻
      </p>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="group flex flex-col lg:flex-row gap-6 p-6 rounded-lg border border-dashed border-border-light dark:border-border-dark hover:border-text-primary-light dark:hover:border-text-primary-dark transition-all duration-300 hover:shadow-lg">
            <div className="relative flex items-center justify-center h-44 lg:h-48 lg:w-2/6 border rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <PlayIcon size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:w-4/6 justify-start items-start">
              <h3 className="text-xl md:text-2xl lg:text-[32px] font-medium font-poppins text-text-primary-light dark:text-text-primary-dark">
                {project.title}
              </h3>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-roboto_mono bg-gray-100 dark:bg-gray-800 text-text-secondary rounded border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-text-secondary text-secondary-text mb-4 font-open_sans">
                {project.description}
              </p>
              
              {/* Metrics */}
              <div className="flex space-x-4 mb-4 text-sm">
                <div className="text-text-secondary">
                  <span className="font-roboto_mono text-text-primary-light dark:text-text-primary-dark">{project.metrics.users}</span> Users
                </div>
                <div className="text-text-secondary">
                  <span className="font-roboto_mono text-text-primary-light dark:text-text-primary-dark">{project.metrics.performance}</span> Performance
                </div>
                <div className="text-text-secondary">
                  <span className="font-roboto_mono text-text-primary-light dark:text-text-primary-dark">{project.metrics.uptime}</span> Uptime
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-transparent text-sm text-text-primary-light dark:text-text-primary-dark border border-dashed border-black dark:border-white px-4 hover:bg-bg-dark dark:hover:bg-bg-light hover:text-text-primary-dark dark:hover:text-text-primary-light py-2 rounded-full font-roboto_mono transition-colors"
                >
                  <GlobeIcon size={16} />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-transparent text-sm text-text-secondary border border-dashed border-text-secondary hover:text-text-primary-light dark:hover:text-text-primary-dark hover:border-text-primary-light dark:hover:border-text-primary-dark px-4 py-2 rounded-full font-roboto_mono transition-colors"
                >
                  <GithubLogoIcon size={16} />
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}