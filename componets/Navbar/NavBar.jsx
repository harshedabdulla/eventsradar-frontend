import React, { useState, useEffect } from 'react'
import Image from 'next/image';

import style from "./NavBar.module.scss"
import instagram from "../../assets/instagram.png"


function Navbar() {


  useEffect(() => {

    const nav = document.querySelector('#navbar');

    const handleScroll = () => {
      console.log(window.pageYOffset)
      if (window.pageYOffset > 40) {
        nav.classList.remove('bottom-nav');
        nav.classList.add('top-nav');
      }
      else if (window.pageYOffset === 0) {
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
      <nav id="navbar" >
        <div className={style.navbar__heading}>
          <h1> <a href="#">CUSAT EVENTS</a>  </h1>
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
      </nav>
      <style jsx>{`
      #navbar {
        position: fixed;
        width: 100%;
        background-color: #ffffff;
        transition: all 10s ease;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        height: 3.5rem;
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



