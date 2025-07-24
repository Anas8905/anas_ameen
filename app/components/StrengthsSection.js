import { CodeIcon, InfinityIcon, LightningIcon, UsersIcon, MagicWand } from '@phosphor-icons/react'
import { useTheme } from '../hooks/useTheme'
import { FaBugSlash } from "react-icons/fa6";
export default function StrengthsSection() {
  const { getStrokeStyle } = useTheme()

  const strengths = [
    {
      number: '01',
      icon: <CodeIcon className="size-[14px] lg:size-5" weight='bold' />,
      title: 'RESPONSIVE WEB DEV',
      description: 'Expert in building and optimizing web applications, enhancing performance and user experience.'
    },
    {
      number: '02',
      icon: <InfinityIcon className="size-[14px] lg:size-5" weight='bold' />,
      title: 'DEVOPS & HOSTING INFRA',
      description: 'Proficient in setting up CI/CD pipelines and cloud hosting infrastructure, driving efficiency and scalability.'
    },
    {
      number: '03',
      icon: <FaBugSlash className="size-[14px] lg:size-5" />,
      title: 'AUTOMATION TESTING',
      description: 'Proficient in automation testing including unit, integration, and end-to-end testing, ensuring code quality and reliability.'
    },
    {
      number: '04',
      icon: <UsersIcon className="size-[14px] lg:size-5" weight='bold' />,
      title: 'LEADERSHIP & TEAM COLLAB',
      description: 'Effective team leader fostering collaboration and mentoring, contributing to a positive work culture.'
    },
    {
      number: '05',
      icon: <MagicWand className="size-[14px] lg:size-5" weight='bold' />,
      title: 'PROBLEM SOLVING',
      description: 'Skilled problem-solver driving technical innovation, from bug fixes to system enhancements.'
    }
  ]

  return (
    <section className="section">
      {/* Large Background Title */}
      <div className="background_title_div">
        <h2 className="background_title" style={getStrokeStyle()}>
          STRENGTHS
        </h2>
        <div className="section_title">
          <span className="text-glow">// STRENGTHS</span>
        </div>
      </div>
      <h2 className="section_heading">
        What I'm Good At
      </h2>

      <p className="section_body_text">
        From pixels to pipelines, I'll make your digital dreams come true! 🚀
      </p>

      <div className="space-y-9">
        {strengths.map((strength, index) => (
          <>
            <div key={index} className="flex flex-col lg:flex-row lg:items-center justify-start space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4 lg:w-[45%]">
                <div className="text-4xl md:text-5xl lg:text-stats-number font-roboto_mono font-bold" style={getStrokeStyle()}>
                  {strength.number}
                </div>
                <div className='flex flex-col space-y-2 justify-end'>
                  <div className="text-text-primary-light dark:text-text-primary-dark">
                    {strength.icon}
                  </div>
                  <div className="font-roboto_mono text-nav-text leading-none mb-2">
                    {strength.title}
                  </div>
                </div>
              </div>
              <div className="flex lg:w-[55%]">
                <p className="text-text-secondary text-secondary-text leading-relaxed font-open_sans">
                  {strength.description}
                </p>
              </div>
            </div>
            {index < strengths.length - 1 && (
              <div className="border-b border-dashed border-[#525456]" />
            )}
          </>
        ))}
      </div>
    </section>
  )
}