import React, { useState, useEffect } from 'react'
import Image from 'next/image';

import style from "./NavBar.module.scss"
import instagram from "../../public/assets/instagram.png"


function Navbar() {



  useEffect(() => {

    const Toggle = document.querySelector('#toggle');
    const overlay = document.querySelector('#overlay');

    Toggle.addEventListener('click', () => {
      Toggle.classList.add('active');
      overlay.classList.add('open');
    });


    overlay.addEventListener('click', () => {
      Toggle.classList.remove('active');
      overlay.classList.remove('open');
    });



    const nav = document.querySelector('#navbar');

    const handleScroll = () => {

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

      Toggle.removeEventListener('click', () => {
        Toggle.classList.toggle('active');
        overlay.classList.toggle('open');
      });
      overlay.removeEventListener('click', () => {
        Toggle.classList.remove('active');
        overlay.classList.remove('open');
      });
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
          <div className="button_container" id="toggle">
            <span className="top"></span>
            <span className="middle"></span>
            <span className="bottom"></span>
          </div>
          <div className="overlay" id="overlay">
            <nav>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </nav>
          </div>
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

  
 
    .button_container {
      position: relative;
      top: 5%;
      right: 1%;
      height: 25px;
      width: 35px;
      cursor: pointer;
      transition: opacity 0.25s ease;
    }
    .button_container:hover {
      opacity: 0.7;
    }
    .button_container.active .top {
      transform: translateY(11px) translateX(0) rotate(45deg);
      background: #FFF;
    }
    .button_container.active .middle {
      opacity: 0;
      background: #FFF;
    }
    .button_container.active .bottom {
      transform: translateY(-11px) translateX(0) rotate(-45deg);
      background: #FFF;
    }
    .button_container span {
      background: white;
      border: none;
      height: 3px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.35s ease;
      cursor: pointer;
    }
    .button_container span:nth-of-type(2) {
      top: 11px;
    }
    .button_container span:nth-of-type(3) {
      top: 22px;
    }
    
    .overlay {
      position: fixed;
      background: #030a05;
      top: 0;
      left: 0;
      width: 100%;
      height: 0%;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.35s, visibility 0.35s, height 0.35s;
      overflow: hidden;
    }
    .overlay.open {
      opacity: 0.98;
      visibility: visible;
      height: 100%;
    }
    .overlay.open li {
      animation: fadeInRight 0.5s ease forwards;
      animation-delay: 0.35s;
    }
    .overlay.open li:nth-of-type(2) {
      animation-delay: 0.4s;
    }
    .overlay.open li:nth-of-type(3) {
      animation-delay: 0.45s;
    }
    .overlay.open li:nth-of-type(4) {
      animation-delay: 0.5s;
    }
    .overlay nav {
      position: relative;
      height: 70%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 50px;
      font-family: "Varela Round", serif;
      font-weight: 400;
      text-align: center;
    }
    .overlay ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      display: inline-block;
      position: relative;
      height: 100%;
    }
    .overlay ul li {
      display: block;
      height: 25%;
      height: calc(100% / 4);
      min-height: 50px;
      position: relative;
      opacity: 0;
    }
    .overlay ul li a {
      display: block;
      position: relative;
      color: #FFF;
      text-decoration: none;
      overflow: hidden;
    }
    .overlay ul li a:hover:after, .overlay ul li a:focus:after, .overlay ul li a:active:after {
      width: 100%;
    }
    .overlay ul li a:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0%;
      transform: translateX(-50%);
      height: 3px;
      background: #FFF;
      transition: 0.35s;
    }
    
    @keyframes fadeInRight {
      0% {
        opacity: 0;
        left: 20%;
      }
      100% {
        opacity: 1;
        left: 0;
      }
    }
     
   `}</style>
    </>
  );
}

export default Navbar;



