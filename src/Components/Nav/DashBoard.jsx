import React, { useEffect, useState } from 'react';
import Frame from '../Frame';
import { useMyContext } from '../Mycontext';
import CustomDropdown2 from '../CustomDropdown2';
import { db, useAuthState } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import FinnhubData from '../FinnhubData';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import AccountDetails from '../AccountDetails';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  const { isOpen, setIsOpen, handleOptionClick, id, setId, setId2, id2 } = useMyContext();
  const [accountDetails, setAccountDetails] = useState([]);
  const [currentUser] = useAuthState();
  const [changer, setChanger] = useState(0);
  const [ids, setIds] = useAuthState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isModalOpen2, setIsModalOpen2] = useState(false); // Modal state

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (currentUser) {
        try {
          const accountsRef = collection(db, "users", currentUser.uid, "accounts");
          const querySnapshot = await getDocs(accountsRef);
          const accounts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAccountDetails(accounts);
        } catch (error) {
          console.error("Error fetching account details:", error);
        }
      }
    };

    fetchAccountDetails();
  }, [currentUser]);

  useEffect(() => {
    if (accountDetails.length > 0 && id2 >= 0 && id2 < accountDetails.length) {
      console.log('Selected account details:', accountDetails[id2]);
    }
  }, [accountDetails, id2]);

  const getFormattedBalance = (balance) => {
    return balance != null ? `$${balance.toLocaleString()}.00` : "$0.00";
  };

  const handleTradeClick = () => {
    if (id2 == 2 && accountDetails[2]?.balance <= 0) {
      setIsModalOpen(true);
    } 

    if(id2 == 0)
    {
      setIsModalOpen2(true);  
    }
 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
  };

  
  const closeModal2 = () => {
  
    setIsModalOpen2(false);
    
  };

  return (
    <div className='w-full pl-5 pr-5 h-full'>
      <Frame>
        <div className='w-full p-9 pl-24 pr-24 h-[300vh]'>
          <div className='w-full h-[300px] bg-white rounded-3xl pl-5 pr-5'>
            <div className='flex justify-between pt-5 pl-5 pr-5'>
              <p className='border-b-4 border-dotted text-gray-400'>Balance</p>
              <div className='w-[300px] flex'>
                <CustomDropdown2
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  options={accountDetails.map((account, index) => ({
                    id: index, // Use the index as the unique id
                    accountType: account.accountType || "N/A",
                    saver: account.saver || "N/A",
                    balance: account.balance || 0
                  }))}
                  handleOptionClick={handleOptionClick}
                  id={id}
                  setId={setId}
                  id2={id2}
                  setId2={setId2}
                  setIds={setIds}
                />
              </div>
            </div>
            <div className='pl-5 pr-5 mt-2'>
              <h1 className='font-semibold text-3xl'>
                {getFormattedBalance(accountDetails[id2]?.balance)}
              </h1>
            </div>
            <div className='pl-5 pr-5 flex justify-between mt-5'>
              <div>
                <h4 className='border-b-2 border-dotted text-gray-500 text-center'>Free Margin</h4>
                {getFormattedBalance(accountDetails[id2]?.balance)}
              </div>
              <div>
                <h4 className='border-b-2 border-dotted text-gray-500 text-center'>Equity</h4>
                {getFormattedBalance(accountDetails[id2]?.balance)}
              </div>
              <div>
                <h4 className='border-b-2 border-dotted text-gray-500 text-center'>Leverage</h4>
                <div>
                  <input type="number" className='w-16 border-none' />
                </div>
              </div>
              <div>
                <h4 className='border-b-2 border-dotted text-gray-500 text-center'>Free Margin</h4>
                <p>{accountDetails[id2]?.accountType || "N/A"}</p>
              </div>
              <div>
                <h4 className='border-b-2 border-dotted text-gray-500 text-center'>Swap</h4>
                <p>No</p>
              </div>
            </div>
            <div>
              {id2 === 1 ? (
                <div className='p-5 flex gap-4'>
                  <Link to={"/trade"}>
                    <button className='w-32 h-16 rounded-full text-lg bg-green-500 text-white'>Trade</button>
                  </Link>
                  <Link to={"/CreateAccount"}>
                    <button className='w-32 h-16 rounded-full text-lg bg-green-50 text-green-500'>Top Up</button>
                  </Link>
                </div>
              ) : (
                <div className='p-5 flex gap-4'>
                    <Link to={ accountDetails[2]?.balance > 0 ?"/realTrade": ""}>    
                    <button
                    className='w-32 h-16 rounded-full text-lg bg-green-50 text-green-500'
                    onClick={handleTradeClick}
                  >
                    Trade
                  </button>
                  </Link>
                  <button className='w-32 h-16 rounded-full text-lg bg-green-500 text-white'>Deposit</button>
                  <button className='w-32 h-16 rounded-full text-lg bg-green-50 text-green-500'>Withdraw</button>
                </div>
              )}
            </div>
            <div className='w-full bg-white rounded-[30px]'>
              <FinnhubData />
            </div>
            <div className='w-full h-[200px] bg-white mt-[40px] rounded-xl items-center justify-center pt-5'>
              <div>
                <div className='flex justify-center items-center'>
                  <h1 className='font-semibold text-xl flex'>
                    50% Bonuses <QuestionMarkCircleIcon className='w-7 text-green-300' />
                  </h1>
                </div>
                <div className='flex p-7'>
                  <p>Here you'll find information about all your active and available bonuses. You can claim a bonus on each deposit.</p>
                  <button className='w-44 h-12 rounded-xl bg-green-50 text-green-500'>See bonuses</button>
                </div>
              </div>
            </div>
            <div className='bg-gray-100 h-[370px] mt-6 w-full rounded-xl'>
              <div className='bg-[whitesmoke] w-[100%] pr-4 pl-4 pt-7 pb-7 h-[70%] rounded-xl mt-14 mb-14'>
                <div className='bg-gray-300 container w-full h-[80px] rounded-lg'></div>
                <div className='p-4'>
                  <h3 className='font-bold'>Your Account</h3>
                  <p className='text-xs'>
                    This is the list of all your accounts in our service. Here you can view the main details, track your activities, and{' '}
                    <span className='text-green-300 underline font-semibold cursor-pointer'>deposit into your account.</span>
                  </p>
                  <div className='p-5'>
                    <div className='flex gap-2 border-b-gray-400 bb bc-gray'>
                      <li
                        className={`w-full p-2 text-xl flex cursor-pointer text-gray-400 ${changer === 0 ? 'text-green-400 underline' : ''}`}
                        onClick={() => setChanger(0)}
                      >
                        <h3>Real</h3>
                      </li>
                      <li
                        className={`w-full p-2 text-xl flex cursor-pointer text-gray-400 ${changer === 1 ? 'text-green-400 underline' : ''}`}
                        onClick={() => setChanger(1)}
                      >
                        <h3>Contests</h3>
                      </li>
                      <li
                        className={`w-full p-2 text-xl flex cursor-pointer text-gray-400 ${changer === 2 ? 'text-green-400 underline' : ''}`}
                        onClick={() => setChanger(2)}
                      >
                        <h3>Demo</h3>
                      </li>
                      <li
                        className={`w-full p-2 text-xl flex cursor-pointer text-gray-400 ${changer === 3 ? 'text-green-400 underline' : ''}`}
                        onClick={() => setChanger(3)}
                      >
                        <h3>Closed</h3>
                      </li>
                    </div>
                    <AccountDetails
                      accountType={0}
                      changer={changer}
                      message="You Do Not Have A Real Account Yet"
                      details={accountDetails.find(account => account.accountType === 'Real')}
                    />
                    <AccountDetails
                      accountType={1}
                      changer={changer}
                      message="You Do Not Have A Contest Account Yet"
                      details={accountDetails.find(account => account.accountType === 'Contests')}
                    />
                    <AccountDetails
                      accountType={2}
                      changer={changer}
                      message="You Do Not Have A Demo Account Yet"
                      details={accountDetails.find(account => account.accountType === 'Demo')}
                    />
                    <AccountDetails
                      accountType={3}
                      changer={changer}
                      message="No closed accounts available."
                      details={accountDetails.find(account => account.accountType === 'Closed')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {isModalOpen && (
        <div className=' absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl mb-4'>Insufficient Balance</h2>
            <p>Your account balance is less than zero. Please deposit into your account to continue trading.</p>
            <div className='mt-4'>
              <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      
{isModalOpen2 && (
        <div className=' absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl mb-4'>Insufficient Balance</h2>
            <p>There Are No Contests Available Yet</p>
            <div className='mt-4'>
              <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={closeModal2}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
