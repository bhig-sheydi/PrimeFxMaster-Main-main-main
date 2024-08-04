import React, { useEffect, useState } from 'react';
import { db, useAuthState } from '../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Frame from './Frame';

const Admin = () => {
  const [accountDetails, setAccountDetails] = useState([]);
  const [currentUser] = useAuthState();
  const [updatedBalances, setUpdatedBalances] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

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
  

  // Filter accounts with accountType 'Real'
  const realAccounts = accountDetails.filter(account => account.accountType === 'Real');

  const handleBalanceChange = (accountId, newBalance) => {
    setUpdatedBalances((prevBalances) => ({
      ...prevBalances,
      [accountId]: newBalance,
    }));
  };

  const handleUpdateClick = async (accountId) => {
    const newBalance = updatedBalances[accountId];
    if (newBalance !== undefined) {
      try {
        const newBalanceFloat = parseFloat(newBalance);
        const accountDocRef = doc(db, "users", currentUser.uid, "accounts", accountId);
        await updateDoc(accountDocRef, { 
          balance: newBalanceFloat,
          equity: newBalanceFloat
        });
        // Update local state to reflect changes
        setAccountDetails(prevDetails =>
          prevDetails.map(account =>
            account.id === accountId ? { ...account, balance: newBalanceFloat, equity: newBalanceFloat } : account
          )
        );
        console.log(`Account with ID ${accountId} updated with new balance and equity: ${newBalance}`);
      } catch (error) {
        console.error("Error updating balance and equity:", error);
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === 'solomon') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className='w-full'>
      <Frame>
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center h-full p-5">
            <h2 className="text-2xl font-semibold mb-4">Admin Access</h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 px-2 py-1 mb-4"
              placeholder="Enter password"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="real-accounts-table">
            <h2 className="text-2xl font-semibold mb-4">Admins Only</h2>
            {realAccounts.length === 0 ? (
              <p>No real accounts available.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Saver</th>
                    <th className="border border-gray-300 px-4 py-2">Balance</th>
                    <th className="border border-gray-300 px-4 py-2">Equity</th>
                    <th className="border border-gray-300 px-4 py-2">New Balance</th>
                    <th className="border border-gray-300 px-4 py-2">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {realAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{account.saver}</td>
                      <td className="border border-gray-300 px-4 py-2">${account.balance.toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2">${account.equity?.toLocaleString() ?? account.balance.toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          value={updatedBalances[account.id] || ''}
                          onChange={(e) => handleBalanceChange(account.id, e.target.value)}
                          className="border border-gray-300 px-2 py-1 w-full"
                          placeholder="Enter new balance"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                          onClick={() => handleUpdateClick(account.id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </Frame>
    </div>
  );
};

export default Admin;
