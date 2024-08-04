import React from 'react'
import Frame from './Frame'
import { useState } from 'react'


const Promotions = () => {

           const [changer , setChanger] = useState(0)
  return (
    <div className='w-full'>
            <Frame>
                 
               <div className="bg-[whitesmoke] w-[80%] pr-4 pl-4 pt-7 pb-7 h-[70%] rounded-xl  mt-14 mb-14 " >
               <div className='w-full  '>
                       <h2 className='pt-2 pl-2  font-bold'>Promotions</h2>
                       <div className='flex gap-4 bb font-bold bc-gray pt-2 pl-2'>  
                          <h3 onClick={()=>setChanger(0)} className={` cursor-pointer ${changer==0 ? "text-green-500 cursor-pointer" : ""}`}>Active</h3>

                              
                          <h2 onClick={()=>setChanger(1)} className={` cursor-pointer ${changer==1 ? "text-green-500 cursor-pointer" : ""}`}>Past</h2>
                       </div>
                </div>
                <div className={`dn ${changer == 1 ? "dv" : ""}`}>
                    <div className="text-green-400 grid p-7 grid-cols-2 gap-10">

                        <div className="p-3 bg-gray-300  rounded-xl  h-[210px]" >
                                <button className='bg-gray-400 w-auto h-auto rounded-2xl text-xs'>Finished</button>
                                <div>
                                    <h2 className='text-green-600 font-bold'>Inspire Your</h2>
                                    <h2 className='text-green-600 font-bold'>Momentum</h2>
                                    <h4 className='text-xs font-semibold text-green-600 pt-5'>11-march-9-April</h4>
                                     <button className='bg-green-600 text-white w-20 h-10 rounded-xl mt-5'>View</button>
                                </div>
                        </div>
                        <div className="p-3  bg-gray-300 rounded-xl">
                        <button className='bg-gray-400 w-auto h-auto rounded-2xl text-xs'>Finished</button>

                        <div>
                                    <h2 className='text-green-600 font-bold'>Inspire Your</h2>
                                    <h2 className='text-green-600 font-bold'>Momentum</h2>
                                    <h4 className='text-xs font-semibold text-green-600 pt-5'>11-march-9-April</h4>
                                     <button className='bg-green-600 text-white w-20 h-10 rounded-xl mt-5'>View</button>
                                </div>
                        </div>
                        <div className="p-3  bg-gray-300  h-[210px] rounded-xl">
                           <button className='bg-gray-400 w-auto h-auto rounded-2xl text-xs'>Finished</button>

                           <div>
                                    <h2 className='text-green-600 font-bold'>Inspire Your</h2>
                                    <h2 className='text-green-600 font-bold'>Momentum</h2>
                                    <h4 className='text-xs font-semibold text-green-600 pt-5'>11-march-9-April</h4>
                                     <button className='bg-green-600 text-white w-20 h-10 rounded-xl mt-5'>View</button>
                                </div>
                       </div>
                        <div className="p-3  bg-gray-300 rounded-xl">
                        <button className='bg-gray-400 w-auto h-auto rounded-2xl text-xs'>Finished</button>
                        <div>
                                    <h2 className='text-green-600 font-bold'>Inspire Your</h2>
                                    <h2 className='text-green-600 font-bold'>Momentum</h2>
                                    <h4 className='text-xs font-semibold text-green-600 pt-5'>11-march-9-April</h4>
                                     <button className='bg-green-600 text-white w-20 h-10 rounded-xl mt-5'>View</button>
                                </div>
                        </div>
                            
                    </div>
                    <div className="text-green-400"></div>
                    <div className="text-green-400"></div>
                    <div className="text-green-400"></div>
                </div>

                <div className={`dn ${changer == 0 ? "dv flex items-center justify-center mt-4" : ""}`}>
                        <div className='flex items-center justify-center bg-gray-300 rounded-2xl h-[200px] w-full'>
                                         <h1>There Are no competition available now</h1>
                        </div>
               </div>
               </div>

             
            </Frame>
    </div>
  )
}

export default Promotions