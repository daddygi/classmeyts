import { faq } from '@/utils/faq'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <>
      <div
        className='before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30 relative w-screen h-screen overflow-hidden'
        id='first'
      >
        <Image
          src='/homepage-illus.png'
          className='absolute top-0 left-0 min-h-full'
          alt='home page'
          width={2880}
          height={1620}
          priority
        />

        <div className='flex flex-col h-screen z-10 absolute w-screen items-center justify-center --bg-important '>
          <Image
            src='/homepage-chat.png'
            className='w-[741px] h-[495px]'
            width={741}
            height={495}
            alt='home page'
          />
          <Link
            className='absolute bottom-40 bg-[#DDE6F1] text-[#2E3546] w-[220px] h-[52px] flex items-center justify-center rounded-xl font-bold text-2xl'
            href='/sign-in'
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className='bg-[#FFE6B3] py-20'>
        <div className='flex items-center justify-between mx-16'>
          <div className='w-3/5'>
            <h2 className='text-sky-950 text-[48px] mb-4 font-bold font w-[700px] leading-none'>
              Connecting Students, Fostering Learning
            </h2>
            <p className='text-sky-950 text-base'>
              At Classmeyt's, we're committed to enhancing your academic journey
              by providing a vibrant online community where students can share
              resources, engage in discussions, and receive valuable peer
              feedback. Our goal is to cultivate a collaborative environment
              that promotes knowledge sharing and supports your growth.
            </p>
          </div>

          <div className='--bg-[#ff0000] flex justify-end w-2/5'>
            <Link
              className='bg-[#2E3546] text-white px-10 py-5 rounded-xl'
              href='/sign-in'
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 text-white'>
        <div className='flex items-end justify-center'>
          <Image alt='pic' src='/homepage1.jpg' width={543} height={362} />
        </div>

        <div className='bg-secondary-color-blue py-6 px-14 flex gap-10 flex-col justify-center h-[539px]'>
          <p className='text-5xl font-bold'>Discussion Module</p>
          <p className='text-lg font-light'>
            Engage in meaningful discussions with fellow students to exchange
            ideas and deepen your understanding of academic subjects. Challenge
            your thinking and broaden your knowledge through interactive
            dialogue.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 text-white'>
        <div className='bg-secondary-color-blue py-6 px-14 flex gap-10 flex-col justify-center h-[539px]'>
          <p className='text-5xl font-bold'>Resource Sharing</p>
          <p className='text-lg font-light'>
            Access and share educational materials such as notes, articles, and
            study guides with your peers. Expand your understanding beyond the
            classroom and contribute to a supportive learning community.
          </p>
        </div>

        <div className='flex items-end justify-center'>
          <Image alt='pic' src='/homepage2.jpg' width={543} height={362} />
        </div>
      </div>

      <div className='grid grid-cols-2 text-white'>
        <div className='flex items-end justify-center'>
          <Image alt='pic' src='/homepage3.jpg' width={543} height={362} />
        </div>

        <div className='bg-secondary-color-blue py-6 px-14 flex gap-10 flex-col justify-center h-[539px]'>
          <p className='text-5xl font-bold'>Peer Feedback</p>
          <p className='text-lg font-light'>
            Give and receive constructive criticism and insights from your peers
            to enhance your academic strengths and areas for improvement. Grow
            personally and academically in a supportive environment.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 text-white'>
        <div className='bg-secondary-color-blue py-6 px-14 flex gap-10 flex-col justify-center h-[539px]'>
          <p className='text-5xl font-bold'>Gamification Features</p>
          <p className='text-lg font-light'>
            Stay motivated and engaged with our reward system. Earn badges for
            participation and achievements like sharing resources and providing
            feedback.
          </p>
        </div>

        <div className='flex items-end justify-center'>
          <Image alt='pic' src='/homepage4.jpg' width={543} height={362} />
        </div>
      </div>

      <div className='bg-[#FFE6B3] py-14 px-72 flex flex-col text-center items-center gap-5'>
        <p className='font-bold text-[32px]'>
          At Classmeyt's, we're excited to embark on this journey with you. Join
          our community and let's elevate learning together!
        </p>

        <Link
          className='bg-[#2E3546] text-white px-10 py-5 rounded-xl w-52'
          href='/sign-up'
        >
          Sign up
        </Link>
      </div>

      <div className='h-[99px] bg-secondary-color-blue text-white flex justify-center items-center'>
        <p className='text-6xl font-bold'>Frequently Asked Questions (FAQs)</p>
      </div>

      <div className='p-14 flex flex-col gap-10 items-center justify-center'>
        <div className='w-[1254px] bg-page-background rounded-2xl p-12 shadow-inner'>
          <div className='flex flex-col gap-8'>
            {Object.keys(faq).map((category, index) => (
              <div key={index} className='space-y-5'>
                <p className='font-bold'>{category}</p>
                <ul className='pl-4 list-decimal'>
                  {faq[category].map((item, index) => (
                    <React.Fragment key={index}>
                      <li className='font-semibold'>{item.question}</li>
                      <ul className='pl-3 list-disc'>
                        <li>{item.answer}</li>
                      </ul>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Link
          className='bg-[#2E3546] text-white px-10 py-5 rounded-xl'
          href='#first'
        >
          Back To The Top
        </Link>
      </div>
    </>
  )
}
