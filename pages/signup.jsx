import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import style from "../styles/Login.module.scss"
import logo from "../public/assets/loginlogo.svg";
import google from "../public/assets/google.png";
import instagram from "../public/assets/instagram3.png";
import whatsapp from "../public/assets/whatsapp3.png";
import linkedin from "../public/assets/linkedin3.png";



const signup = () => {
  return (
    <div className={style.container}>

      <div className={style.imageContainer}>
       <Image src={logo} alt="logo" width="300" className={style.logo} />
        <p>Already have an account?<Link href="/login"> Log in</Link></p>
        <div className={style.socialIcons}>
          <span><Image src={instagram} alt="logo" width="50" /></span>
          <span><Image src={whatsapp} alt="logo" width="60" /></span>
          <span><Image src={linkedin} alt="logo" width="50" /></span>

        </div>
      </div>

      <div className={style.signup_form}>

        <button className={style.GoogleBtn} >
          <Image src={google} alt="logo" width="20" />
          <p> Sing Up With Google</p>
        </button>


        <div className={style.hr}>
          <hr />
          <span> Or </span>
          <hr />
        </div>


        <form>
          <label for="username">First name</label>
          <input id="username" type="text" />

          <label for="username">Last name</label>
          <input id="username" type="text" />

          <label for="email">Email</label>
          <input id="email" type="email" />

          <label for="password">Password</label>
          <input id="password" type="password" />

          <div >
            <input id="checkbox" type="checkbox" required />
            <label for="checkbox">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>

          <button className={style.submitBtn} type="submit">Sing Up</button>
        </form>

      </div>
    </div>
  )
}

export default signup


