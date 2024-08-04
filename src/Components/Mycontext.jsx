import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [hide, setHide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [id, setId] = useState(0);
  const [catigs, setCatgs] = useState([]);
  const [newCatig, setnNewCatig] = useState({});
  const [traderExp , setTraderExp] = useState("ex")
  const [submit , setsubmit] = useState("submit")
  const [id2 , setId2] = useState(0)


  const makeHide = (value) => {
    setHide(value);
  };

  const toggleNavbarVisibility = () => {
    setIsNavbarVisible(true);
  };

  const handleOptionClick = (id, option) => {
    setSelectedOptions((prev) => ({ ...prev, [id]: option }));
    setIsOpen(false);
    
  };

  return (
    <MyContext.Provider value={{
      isNavbarVisible,
      toggleNavbarVisibility,
      makeHide,
      hide,
      isOpen,
      setIsOpen,
      selectedOptions,
      handleOptionClick,
      id,
      setId,
      catigs,
      setCatgs,
      newCatig,
      setnNewCatig,
      traderExp, 
      setTraderExp,
      submit,
      setsubmit, 
      setId2 ,
      id2
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
