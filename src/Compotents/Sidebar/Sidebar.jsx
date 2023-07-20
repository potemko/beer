import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Sidebar.module.css"
import { FaBars, FaTimes } from 'react-icons/fa';
import RegisterModal from "../RegisterModal/RegisterModal";
// import Author from "../Author/Author";



const Sidebar = () => {

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const scrolledHeight = window.scrollY;
      const triggerHeight = 100;

      if (scrolledHeight > triggerHeight) {
        header.style.backdropFilter = 'blur(9px)';
        // header.style.backgroundColor = 'rgba(0, 123, 255, 0.5)';
      } else {
        header.style.backdropFilter = 'none';
        header.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div>
      <header>
      <h2 className={css.logo}>Garrison</h2>
      <nav className={`${css.navigation} ${isMobileNavOpen ? css.open : ''}`}>
        <NavLink className={css.link} activeclassname={css.active} onClick={closeMobileNav} to="/">Home</NavLink>
        <NavLink className={css.link} activeclassname={css.active} onClick={closeMobileNav} to="/author">Author</NavLink>
        <NavLink className={css.link} activeclassname={css.active} onClick={closeMobileNav}>Contact</NavLink>
        <button onClick={openModal} className={css.buttonLogin} >Login</button>
      </nav>
      <div className={css.mobileNavToggle} onClick={toggleMobileNav}>
        {isMobileNavOpen ? <FaTimes className={css.icon}/> : <FaBars className={css.icon}/>}
      </div>
      
    </header>

    {isModalOpen && <RegisterModal closeModal={closeModal}/>
    }


    </div>
    
  );
};

export default Sidebar;


