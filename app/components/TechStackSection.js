import { useTheme } from '../hooks/useTheme'
import { useState, useEffect } from 'react'
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiJest,
  SiCypress,
  SiGithubactions,
  SiTerraform
} from 'react-icons/si'

const techCategories = [
  {
    name: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    technologies: [
      { name: 'React', icon: <SiReact />, level: 95 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 90 },
      { name: 'Next.js', icon: <SiNextdotjs />, level: 88 },
    ]
  },
  {
    name: 'Backend',
    color: 'from-green-500 to-emerald-500',
    technologies: [
      { name: 'Node.js', icon: <SiNodedotjs />, level: 92 },
      { name: 'GraphQL', icon: <SiGraphql />, level: 85 },
    ]
  },
  {
    name: 'Database',
    color: 'from-purple-500 to-pink-500',
    technologies: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 88 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 85 },
      { name: 'Redis', icon: <SiRedis />, level: 82 },
    ]
  },
  {
    name: 'DevOps',
    color: 'from-orange-500 to-red-500',
    technologies: [
      { name: 'Docker', icon: <SiDocker />, level: 88 },
      { name: 'Kubernetes', icon: <SiKubernetes />, level: 75 },
      { name: 'Terraform', icon: <SiTerraform />, level: 82 },
    ]
  },
  {
    name: 'Testing',
    color: 'from-yellow-500 to-amber-500',
    technologies: [
      { name: 'Jest', icon: <SiJest />, level: 90 },
      { name: 'Cypress', icon: <SiCypress />, level: 85 },
      { name: 'CI/CD', icon: <SiGithubactions />, level: 88 },
    ]
  }
]

export default function TechStackSection() {
  const { getStrokeStyle } = useTheme()
  const [hoveredTech, setHoveredTech] = useState(null)
  const [animatedLevels, setAnimatedLevels] = useState({})

  useEffect(() => {
    const timer = setTimeout(() => {
      const levels = {}
      techCategories.forEach(category => {
        category.technologies.forEach(tech => {
          levels[tech.name] = tech.level
        })
      })
      setAnimatedLevels(levels)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="section">
      <div className="background_title_div">
        <h2 className="background_title" style={getStrokeStyle()}>
          TECH STACK
        </h2>
      </div>

      <div className="section_title">
        <span className="text-glow">// TECHNOLOGY STACK</span>
      </div>
      <h2 className="section_heading">
        Tools & Technologies
      </h2>

      <p className="section_body_text">
        A comprehensive overview of my technical expertise across the full development lifecycle 🛠️
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
              <h3 className="text-lg font-medium font-poppins text-text-primary-light dark:text-text-primary-dark">
                {category.name}
              </h3>
            </div>
            
            <div className="space-y-3">
              {category.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-text-primary-light dark:text-text-primary-dark text-lg">
                        {tech.icon}
                      </span>
                      <span className="text-sm font-open_sans text-text-secondary group-hover:text-text-primary-light dark:group-hover:text-text-primary-dark transition-colors">
                        {tech.name}
                      </span>
                    </div>
                    <span className="text-xs font-roboto_mono text-text-secondary">
                      {animatedLevels[tech.name] || 0}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out ${
                        hoveredTech === tech.name ? 'shadow-lg' : ''
                      }`}
                      style={{
                        width: `${animatedLevels[tech.name] || 0}%`,
                        boxShadow: hoveredTech === tech.name ? `0 0 10px rgba(59, 130, 246, 0.5)` : 'none'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}