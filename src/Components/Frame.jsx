import React from 'react'
import nav from "/src/assets/NAV.png";
import Footer from './Footer';

const Frame = ({ children }) => {
  return (
    <div className='w-[73%] '>
      <div>
        <img src={nav} alt="Navigation" className='w-[200px] p-5' />
      </div>
      <div className='w-full h-full bg-green-100 justify-center flex items-center'>
        {children}
      </div>
      

      <Footer/>
    </div>
  )
}

export default Frame;
