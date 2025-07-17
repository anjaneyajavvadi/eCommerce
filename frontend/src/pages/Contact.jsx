import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 justify-center mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col gap-6 justify-center items-start'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 West 2nd Street <br/> San Francisco, CA 94107</p>
          <p className='text-gray-500'> Tel: 1-800-123-4567 <br/> email: 5l6rD@example.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Darkens</p>
          <p className='text-gray-500'>Learn more about working at Darkens</p>
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Job Openings</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}
export default Contact