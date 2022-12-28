import React, { useState, useEffect } from 'react'
import Image from 'next/image';
// import { isMobile } from 'react-device-detect';
import {HiMenuAlt4, HiX} from "react-icons/hi";
import { motion } from 'framer-motion';


import style from "./NavBar.module.scss"
import instagram from "../../public/assets/instagram.png"


function Navbar() {

  const [toggle, setToggle] = useState(false);

  useEffect(() => {

    const nav = document.querySelector('#navbar');

    const handleScroll = () => {

      if (window.pageYOffset > 40 ) {
        nav.classList.remove('bottom-nav');
        nav.classList.add('top-nav');
      }
      else if (window.pageYOffset === 0 ) {
        nav.classList.add('bottom-nav');
        nav.classList.remove('top-nav');
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <nav id="navbar" className={style.nav} >
        <div className={style.navbar__heading}>
          <h1> <a href="/">CUSAT EVENTS</a>  </h1>
        </div>
        <hr className={style.hr} />
        <ul className={style.navbar__list}>
          <li> <a href="#">About</a> </li>
          <li> <a href="#">Events</a></li>
          <li className={style.socialIcon}>
            <a href="#">
              <Image
                src={instagram}
                alt="insta"
                layout="responsive"
              />
            </a>
          </li>
        </ul>

        <div className={style.navbar_menu}>
        <HiMenuAlt4 onClick={() => setToggle(true)} />  
        
        {toggle && (
          <motion.div
          whileInView={{x : [300, 0]}}
          transition={{duration : 0.85, ease : "easeOut" }} >
          
          <HiX onClick={() => setToggle(false)} />

          <ul>
              {['home', 'events', 'about'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
        </motion.div> 
        )} 
      </div>


      </nav>
      <style jsx>{`
      #navbar {
        position: fixed;
        width: 100%;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        height: 3.5rem;
      }

      @media screen and (max-width: 700px) {
        #navbar {
          position: fixed;
          width: 100%;
          background-color: #030a05;
          top: 1%;
          margin-left: 5.4%;
          width: 70%;
          border-radius: 13px;
          align-items: center;
          border: 1px solid white;
          height: 2.5rem;
          color: white;
        }
      }
      @media screen and (max-width: 700px) and (min-width: 425px) {
        #navbar {
          margin-left: 9%;
          height: 3rem;       
        }
      }
  
      .bottom-nav {
        bottom: 0;
        postion: abosulte;
      }
      
     .top-nav{
       top: 0;
        position: fixed;
        z-index: 999;
     }
     
   `}</style>
    </>
  );
}

export default Navbar;



