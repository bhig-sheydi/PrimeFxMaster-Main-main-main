import React, { useState, useEffect } from 'react';
import Frame from './Frame';
import AccountDetails from './AccountDetails';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthState } from '../config/firebase'; // Import useAuthState

const TradingAccount = () => {
  const [changer, setChanger] = useState(0);
  const [accountDetails, setAccountDetails] = useState([]);
  const [currentUser] = useAuthState();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (currentUser) {
        try {
          const accountsCollectionRef = collection(db, "users", currentUser.uid, "accounts");
          const accountsSnapshot = await getDocs(accountsCollectionRef);
          const accountsData = accountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          if (accountsData.length > 0) {
            setAccountDetails(accountsData);
          } else {
            console.log("No accounts found!");
            setAccountDetails([]);
          }
        } catch (error) {
          console.error("Error fetching account details:", error);
          setAccountDetails([]);
        }
      }
    };

    fetchAccountDetails();
  }, [currentUser]);

  return (
    <div className='w-full'>
      <Frame>
        <div className='bg-[whitesmoke] w-[80%] pr-4 pl-4 pt-7 pb-7 h-[70%] rounded-xl mt-14 mb-14'>
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
                message='You Do Not Have A Real Account Yet'
                details={accountDetails.find((account) => account.accountType === 'Real')}
              />
              <AccountDetails
                accountType={1}
                changer={changer}
                message='You Do Not Have A Contest Account Yet'
                details={accountDetails.find((account) => account.accountType === 'Contests')}
              />
              <AccountDetails
                accountType={2}
                changer={changer}
                message='You Do Not Have A Demo Account Yet'
                details={accountDetails.find((account) => account.accountType === 'Demo')}
              />
              <AccountDetails
                accountType={3}
                changer={changer}
                message='No closed accounts available.'
                details={accountDetails.find((account) => account.accountType === 'Closed')}
              />
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default TradingAccount;
