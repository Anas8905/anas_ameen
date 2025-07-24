import { GraduationCapIcon, BriefcaseMetalIcon } from '@phosphor-icons/react'
import { useTheme } from '../hooks/useTheme'

export default function ResumeSection() {
  const { getStrokeStyle } = useTheme()

  const education = [
    {
      period: '2021 - 2022',
      title: 'CutShort Certified React.js - Advanced',
      company: '@ CutShort'
    },
    {
      period: '2018 - 2020',
      title: 'AWS Certified Developer: Associate',
      company: '@ Amazon Web Services (AWS)'
    },
    {
      period: '2012 - 2016',
      title: 'Bachelors in Computer Science & Engineering',
      company: '@ West Bengal University of Technology'
    }
  ]

  const experience = [
    {
      period: '2023 - PRESENT',
      title: 'Senior Software Engineer',
      company: '@ HousingAnywhere'
    },
    {
      period: '2020 - 2022',
      title: 'Software Engineer',
      company: '@ Openhouse'
    },
    {
      period: '2019 - 2020',
      title: 'Software Engineer',
      company: '@ Cerner Corporation'
    },
    {
      period: '2016 - 2019',
      title: 'System Engineer',
      company: '@ Tata Consultancy Services'
    }
  ]

  const sections = [
    {
      icon: <BriefcaseMetalIcon size={32} className="text-text-primary-light dark:text-text-primary-dark" />,
      items: experience,
    },
    {
      icon: <GraduationCapIcon size={32} className="text-text-primary-light dark:text-text-primary-dark" />,
      items: education,
    }
  ]

  return (
    <section className="section">
      {/* Large Background Title */}
      <div className="background_title_div">
        <h2 className="background_title" style={getStrokeStyle()}>
          RESUME
        </h2>
      </div>

      <div className="section_title">// RESUME</div>
      <h2 className="section_heading">
        Education & Experience
      </h2>

      <p className="text-text-secondary text-secondary-text mb-12 leading-relaxed font-open_sans">
        The dynamic duo shaping me into a coding superhero, with every lesson and project fueling my journey! 📚
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="flex items-center space-x-3 mb-8">
              {section.icon}
            </div>

            <div className="relative">
              {/* Vertical line connecting all items */}
              <div className="absolute border-l border-dashed border-border-light dark:border-border-dark left-[3px] top-0 bottom-0"></div>
              
              <div className="space-y-8">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="relative">
                    <div className="flex items-start">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-start mt-[10px]">
                        <div className="size-1.5 bg-black dark:bg-white rounded-full "/>
                        <div className='border-b border-dashed w-4 h-0 border-border-light dark:border-border-dark'/>
                      </div>
                      
                      <div className="flex-1 pb-2">
                        {/* Period pill */}
                        <div className="inline-block mb-3">
                          <span className="px-3 py-1 text-xs font-roboto_mono bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-full border border-gray-200 dark:border-gray-600">
                            {item.period}
                          </span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-medium mb-1 font-poppins text-experience-title text-text-primary-light dark:text-text-primary-dark">
                          {item.title}
                        </h3>
                        
                        <div className="text-text-secondary text-secondary-text font-open_sans">
                          {item.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}