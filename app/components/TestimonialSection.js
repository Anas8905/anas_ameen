'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ArrowLeftIcon, ArrowRightIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { useTheme } from '../hooks/useTheme'
import 'swiper/css'
import 'swiper/css/navigation'

function Rating({ stars }) {
  const rating = new Array(5).fill(0);
  for (let i = 0; i < stars; i++) {
    rating[i] = 1;
  }

  return (
    <div className="flex items-center space-x-1">
      {rating.map((val, ind) =>
        val === 1 ? (
          <svg
            className="size-[18px] text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            key={ind}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ) : (
          <svg
            className="size-[18px] text-muted"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            key={ind}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        )
      )}
    </div>
  );
}

export default function TestimonialSection() {
  const { getStrokeStyle } = useTheme()
  const swiperRef = useRef(null)

  const testimonials = [
    {
      name: 'Ruslan Doronichev',
      title: 'Sr. Product Manager',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop&crop=face',
      rating: 5,
      text: 'I had the opportunity to work with Soham on several projects at Housing Anywhere. Soham was always proactive, clearly communicating his game plan and managing expectations effectively. He had to collaborate with colleagues from different teams, and his ability to align everyone was impressive.',
      readMore: true,
      linkedin: 'https://www.linkedin.com/in/ruslan-doronichev',
    },
    {
      name: 'Sudhan Dhayalan',
      title: 'VP of Engineering at Toku',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop&crop=face',
      rating: 5,
      text: 'I had the pleasure of managing Soham for 1.5 years while working in HousingAnywhere, during which he consistently demonstrated exceptional skills and a strong work ethic. Soham is an outstanding individual contributor who reliably delivers high-quality code.',
      readMore: true,
      linkedin: 'https://www.linkedin.com/in/sudhan-dhayalan',
    },
    {
      name: 'Anika Sharma',
      title: 'Lead Designer at Openhouse',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop&crop=face',
      rating: 5,
      text: 'Soham’s ability to translate complex design requirements into functional code was a game-changer for our team at Openhouse. His attention to detail and collaborative spirit made working with him a seamless experience.',
      readMore: false,
      linkedin: 'https://www.linkedin.com/in/anika-sharma',
    },
    {
      name: 'Michael Chen',
      title: 'Tech Lead at Cerner Corporation',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop&crop=face',
      rating: 5,
      text: 'Soham brought a level of professionalism and technical expertise to our projects at Cerner. His problem-solving skills and dedication to clean code practices significantly improved our development workflow.',
      readMore: true,
      linkedin: 'https://www.linkedin.com/in/michael-chen',
    },
  ]

  const buttons = [
    {
      icon: <ArrowLeftIcon size={20} />,
      className: 'custom-prev',
    },
    {
      icon: <ArrowRightIcon size={20} />,
      className: 'custom-next',
    },
  ]

  return (
    <section className="section">
      {/* Large Background Title */}
      <div className="relative top-0 left-0 pointer-events-none">
        <h2 className="background_title" style={getStrokeStyle()}>
          TESTIMONIALS
        </h2>
      </div>

      <div className="flex flex-row justify-between items-start lg:items-center mb-4">
        <div>
          <div className="section_title">// WHAT PEOPLE SAY</div>
          <h2 className="section_heading">
            Testimonials
          </h2>
        </div>

        <div className="flex space-x-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={` size-10 rounded-full border border-dashed flex items-center justify-center hover:bg-bg-dark dark:hover:bg-bg-light text-text-primary-light dark:text-text-primary-dark  hover:text-text-primary-dark hover:dark:text-text-primary-light transition-colors ${button.className}`}
            >
              {button.icon}
            </button>
          ))}
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        loop={true}
        className="w-full mb-8"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="space-y-4">
              <Rating stars={testimonial.rating} />
              <p className="text-text-secondary text-secondary-text leading-relaxed font-open_sans">
                {testimonial.text}
                {testimonial.readMore && (
                  <button className="text-blue-500 ml-1 hover:underline">Read More</button>
                )}
              </p>
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="font-medium font-poppins text-experience-title text-text-primary-light dark:text-text-primary-dark">
                      {testimonial.name}
                    </div>
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-blue-500 transition-colors"
                    >
                      <LinkedinLogoIcon size={20} />
                    </a>
                  </div>
                  <div className="text-text-secondary text-sm font-open_sans">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}