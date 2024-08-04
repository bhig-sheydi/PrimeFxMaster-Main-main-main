import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMyContext } from './Mycontext';
import CustomDropdown from './CustomDropdown';
import { Squares2X2Icon, Bars3Icon, StarIcon } from '@heroicons/react/20/solid';
import Footer from './Footer';
import TermsAndConditions from './TermAndConditions';
import { Link } from 'react-router-dom';

const RandomUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { makeHide, isOpen, setIsOpen, selectedOptions, handleOptionClick, id, setId, catigs, setCatgs, newCatig, setnNewCatig, traderExp, setsubmit, submit, setTraderExp } = useMyContext();
  const [cl, setcl] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [profit, setProfit] = useState([]);
  const [loss, setLoss] = useState([]);
  const [commission, setComission] = useState([]);
  const [timeFrame, setTimeframe] = useState("All Time");
  const [isMostPopular, setMostpopular] = useState(false);
  const [switching, setSwitch] = useState(0);

  useEffect(() => {
    makeHide(true);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        setUsers(response.data.results);

        // Generate random numbers for each user between 25 and 100
        const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 76) + 25);
        const profits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 3000) + 2500);
        const Losses = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 2500);
        const commissions = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 30);
        // Sort the numbers in descending order
        numbers.sort((a, b) => b - a);
        setRandomNumbers(numbers);
        setComission(commissions);
        setLoss(Losses);
        setProfit(profits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cl) setId(0);
    if (id === 0) setcl(false);
  }, [cl, id]);

  const dropdownOptions = [
    ['Risk Score1', 'Top Genre1', 'Most Popular1'],
    ['2Weeks', '1Month', '3Months', "6months", "All Time"],
    ['$25', '$50', '$100', "$300", "$500", "$700", "$1000"],
    ['Legend', 'Expert', 'High Achiever', "Growing Talent"]
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      setUsers(response.data.results);

      // Generate random numbers for each user between 25 and 100
      const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 76) + 25);
      const profits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 3000) + 2500);
      const Losses = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 2500);
      const commissions = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 30);
      // Sort the numbers in descending order
      numbers.sort((a, b) => b - a);
      setRandomNumbers(numbers);
      setComission(commissions);
      setLoss(Losses);
      setProfit(profits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' pl-12 pr-10 pt-10 pb-3 container font-medium '>
              <div className='w-[60vw]'>
          <h1 className='text-4xl'>PrimeFX Copy Trading</h1>
          <div>
            <div className='mt-5 flex gap-5 text-gray-500 font-semibold text-xl'>
              <h1 className={`cursor-pointer  ${switching === 0 ? "text-green-600 border-b-2 border-green-600" : ""}`} onClick={() => setSwitch(0)}>Rating</h1>
              <h1 className={`cursor-pointer ${switching === 1 ? "text-green-600 border-b-2 border-green-600" : ""}`} onClick={() => setSwitch(1)}>Terms & Conditions</h1>
            </div>

            
          </div>
        </div>
      <div className={switching ==0 ? "dv" : "dn"}>
      <div className='flex font-medium'>


<div className='w-[60vw]'>
    
    <div>
     

      <div className='mt-7 flex gap-4 w-[100%]'>
        <div className='w-[100%]'>
          <h1 className='text-3xl pt-4'>Master Rating</h1>
          <div className='grid-cols-2 gap-4 border-solid grid mt-5'>
            {dropdownOptions.map((options, index) => (
              <div
                key={index}
                className='relative border-solid border-gray-400 border-2 h-16 w-15 rounded-xl flex gap-3 items-center justify-center'
                onClick={() => { setId(index + 1) }}
              >
                <h2 className='absolute top-[-12px] left-2 bg-white text-gray-300'>{index === 0 ? "Whom to Show First" : index === 1 ? "For What Time" : index === 2 ? "Minimum investment" : "Minimum Expertise"}</h2>
                <CustomDropdown
                  options={options}
                  isOpen={id === index + 1}
                  setIsOpen={setIsOpen}
                  handleOptionClick={handleOptionClick}
                  id={index + 1}
                  setId={setId}
                  closer={setcl}
                  cl={cl}
                  traderExp={traderExp}
                  setTraderExp={setTraderExp}
                  setTimeframe={setTimeframe}
                  setPopular={setMostpopular}
                  fetchData={fetchData}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-[60%] pt-24 gap-1'>
       
          <h1 className='text-sm flex gap-1 items-center justify-center'>7 Days Free Trial <input type="checkbox" className='h-7 w-7' /></h1>
        </div>
        <Link  onClick={()=>{  window.location.href = "/"}} className='w-[200px]'>Back Home</Link>
       
      </div>
    </div>
  </div>

  <div className='flex items-center justify-center h-full pt-[20%] gap-4 '>
    <input placeholder='nickname' />
    <Squares2X2Icon className='w-10' />
    <Bars3Icon className='w-10' />
  </div>
</div>

<div className='mt-24 grid gap-5 pl-10 pr-10 items-center'>
  <div className='grid grid-cols-6 grid-flow-col items-center justify-center' style={{ gridTemplateColumns: '3fr 1fr 2fr 1fr 1fr 1fr' }}>
    <div className='w-full h-[60px]'>
    </div>
    <div>
      <h1 className='text-sm'>Risk score</h1>
      <h5 className='text-gray-500 text-xs'>{timeFrame === dropdownOptions[1][0] ? dropdownOptions[1][0] : ""}</h5>
    </div>
    <div>
      <h1 className='text-sm'>Gain</h1>
      <h5 className='text-gray-500 text-xs'>{timeFrame}</h5>
    </div>
    <div>
      <h1 className='text-sm'>Profit & Loss</h1>
      <h5 className='text-gray-500 text-xs'>{timeFrame}</h5>
    </div>
    <div>
      <h1 className='text-sm'>Copiers</h1>
      <h5 className='text-gray-500 text-xs'>{timeFrame}</h5>
    </div>
    <div>
      <h1 className='text-sm'>Commission</h1>
    </div>
  </div>

  {users.map((user, index) => (
    <div key={index} className='grid grid-flow-col' style={{ gridTemplateColumns: '3fr 1fr 2fr 1fr 1fr 1fr' }}>
      <div className='flex gap-8'>
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className='w-12 rounded-full' />
        <div>
          <h1>{`${user.name.first} ${user.name.last}`}</h1>
          <h1 className='flex gap-3 text-gray-600'>
            <StarIcon className={` ${traderExp === "ex" && submit === "submit" ? "text-blue-500 w-4" : traderExp === "ha" && submit === "submit" ? "text-green-500 w-4" : traderExp === "le" && submit === "submit" ? "text-orange-500 w-4" : "dn"}`} />
            {traderExp === "ex" && submit === "submit" ? "Expert" :
              traderExp === "le" && submit === "submit" ? "Legend" :
                traderExp === "ha" && submit === "submit" ? "High Achiever" : ""}
          </h1>
        </div>
      </div>
      <button className='w-14 h-6 text-xs p-0 bg-green-600 rounded-xl'>1Risk</button>
      <p className='text-green-600'>+{randomNumbers[index]}%</p>

      <div className='flex '>
        <div className='pr-3 border-b-2 border-green-500'>
          <p className=''>{profit[index]}</p>
        </div>
        <div className={`${loss[index] > 50 ? "border-b-2  border-red-500" : "border-b-2 border-green-500"}`}>
          <p >
            {loss[index]}
          </p>
        </div>
      </div>

      <div className='pl-4 text-green-500'>
        <p> {isMostPopular === true ? loss[index] : randomNumbers[index]}</p>
      </div>

      <div className='pl-4 text-green-500'>
        <p>{commission[index]}%</p>
      </div>

    </div>

  ))}
</div>
      </div>


      <div className={switching == 1 ? "dv" : "dn"}>
           <TermsAndConditions/>
      </div>

      <Footer />
    </div>
  );
};

export default RandomUsers;
