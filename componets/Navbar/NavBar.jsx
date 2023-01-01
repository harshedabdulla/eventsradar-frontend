import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ThreeDots } from 'react-loader-spinner';

import style from "./NavBar.module.scss"
import instagram from "../../public/assets/instagram.png"


function Navbar() {

  const [isLoadingScreen, setIsLoadingScreen] = useState(false);

  const handleClicked = () => {
    setIsLoadingScreen(true);
  }



  useEffect(() => {

    const Toggle = document.querySelector('#toggle');
    const overlay = document.querySelector('#overlay');

    Toggle.addEventListener('click', () => {
      Toggle.classList.add(style.active);
      overlay.classList.add(style.open);
    });


    overlay.addEventListener('click', () => {
      Toggle.classList.remove(style.active);
      overlay.classList.remove(style.open);
    });



    const nav = document.querySelector('#navbar');

    const handleScroll = () => {

      if (window.pageYOffset > 40) {
        nav.classList.remove(style.bottom_nav);
        nav.classList.add(style.top_nav);
      }
      else if (window.pageYOffset === 0) {
        nav.classList.add(style.bottom_nav);
        nav.classList.remove(style.top_nav);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);

      Toggle.removeEventListener('click', () => {
        Toggle.classList.add(style.active);
        overlay.classList.add(style.open);
      });


      overlay.removeEventListener('click', () => {
        Toggle.classList.remove(style.active);
        overlay.classList.remove(style.open);
      });
    }
  }, []);

  return (
    <>
      {isLoadingScreen ?
       
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperClass={style.loadingScreen}
            visible={true}
          />
        : null }
        <nav id="navbar" className={style.navbar} >
          <div className={style.navbar__heading}>
            <h1> <Link href="/" >CUSAT EVENTS</Link>  </h1>
          </div>
          <hr className={style.hr} />
          <ul className={style.navbar__list}>
            <li> <Link href="/" >About</Link> </li>
            <li> <Link href="/events" onClick={handleClicked} >Events</Link></li>
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
            <div className={style.button_container} id="toggle">
              <span className={style.top}></span>
              <span className={style.middle}></span>
              <span className={style.bottom}></span>
            </div>
            <div className={style.overlay} id="overlay">
              <nav>
                <ul>
                  <li><Link href="/"  >Home</Link></li>
                  <li><Link href="/events" onClick={handleClicked} >Events</Link></li>
                  <li><Link href="/" >About</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
    </>
  );
}

export default Navbar;



