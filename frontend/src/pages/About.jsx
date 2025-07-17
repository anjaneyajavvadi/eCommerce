import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'A'} text2={'BOUT US'}></Title>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for the world of fashion. We believe that fashion should be accessible to all, and we are committed to making it easy for you to find the perfect look for any occasion.</p>
          <p>Since our founders started Darkens, we have been dedicated to providing a one-stop-shop for fashion lovers. Whether you're looking for the latest trends or classic classics, we have it all.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Darkens is to help you find the perfect look for any occasion. We believe that fashion should be accessible to all, and we are committed to making it easy for you to find the perfect look for any occasion.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We take pride in our products and guarantee that they are of the highest quality.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience</b>
          <p className='text-gray-600'>We believe that fashion should be accessible to all, and we are committed to making it easy for you to find the perfect look for any occasion.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our team of experts is always available to help you with any questions or concerns you may have.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About;