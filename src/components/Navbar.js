import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userID');
  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('http://localhost:5261/currency/getDolarExchangeRate');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Check the structure of the data
        setExchangeRate(data.usD_TO_TRY);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    
    fetchExchangeRate();
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          
          {exchangeRate !== null && (
            <div className='exchange-rate'>
              USD/TRY: {exchangeRate}
            </div>
          )}
         
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link onClick={handleLogout} to='/'>
                <AiIcons.AiOutlineLogout />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
