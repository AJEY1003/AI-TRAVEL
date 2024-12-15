
import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-60 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover your new adventure with AI:</span> The ultimate travel companion in your life
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
      </p>
      <Link to={'/create-trip'}>
        <button className='bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>
          Get started, It's absolutely free
        </button>
      </Link>
    </div>
  );
}

export default Hero;
