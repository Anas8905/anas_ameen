import { useTheme } from '../hooks/useTheme'
import { useState, useEffect } from 'react'
import { 
  CodeIcon, 
  GitBranchIcon, 
  BugIcon, 
  RocketLaunchIcon,
  ClockIcon,
  UsersIcon,
  TrendUpIcon,
  ShieldCheckIcon
} from '@phosphor-icons/react'

const metrics = [
  {
    icon: <CodeIcon size={24} />,
    value: 500000,
    suffix: '+',
    label: 'Lines of Code',
    description: 'Production code written',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <GitBranchIcon size={24} />,
    value: 1200,
    suffix: '+',
    label: 'Commits',
    description: 'Git contributions',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <BugIcon size={24} />,
    value: 95,
    suffix: '%',
    label: 'Bug Resolution',
    description: 'Issues resolved',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: <RocketLaunchIcon size={24} />,
    value: 40,
    suffix: '+',
    label: 'Deployments',
    description: 'Production releases',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: <ClockIcon size={24} />,
    value: 99.9,
    suffix: '%',
    label: 'Uptime',
    description: 'System reliability',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: <UsersIcon size={24} />,
    value: 15,
    suffix: '+',
    label: 'Team Members',
    description: 'Mentored developers',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: <TrendUpIcon size={24} />,
    value: 40,
    suffix: '%',
    label: 'Performance Boost',
    description: 'Average optimization',
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: <ShieldCheckIcon size={24} />,
    value: 100,
    suffix: '%',
    label: 'Security Score',
    description: 'Vulnerability-free',
    color: 'from-indigo-500 to-purple-500'
  }
]

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [value, duration])

  return count
}

export default function MetricsSection() {
  const { getStrokeStyle } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('metrics-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="metrics-section" className="section">
      <div className="background_title_div">
        <h2 className="background_title" style={getStrokeStyle()}>
          METRICS
        </h2>
      </div>

      <div className="section_title">
        <span className="text-glow">// PERFORMANCE METRICS</span>
      </div>
      <h2 className="section_heading">
        Impact & Results
      </h2>

      <p className="section_body_text">
        Quantifiable achievements that demonstrate technical excellence and business impact 📊
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="group relative p-6 rounded-lg border border-dashed border-border-light dark:border-border-dark hover:border-text-primary-light dark:hover:border-text-primary-dark transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full bg-gradient-to-r ${metric.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-text-primary-light dark:text-text-primary-dark">
                  {metric.icon}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold font-roboto_mono text-text-primary-light dark:text-text-primary-dark">
                  {isVisible ? <AnimatedCounter value={metric.value} /> : 0}
                  <span className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.suffix}
                  </span>
                </div>
                <div className="text-sm font-medium font-poppins text-text-primary-light dark:text-text-primary-dark">
                  {metric.label}
                </div>
                <div className="text-xs text-text-secondary font-open_sans">
                  {metric.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}