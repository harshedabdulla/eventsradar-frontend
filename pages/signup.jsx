import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner'
import { SignupReqeust } from '../api/signup';

import style from "../styles/Login.module.scss"
import logo from "../public/assets/loginlogo.svg";
import google from "../public/assets/google.png";
import instagram from "../public/assets/instagram3.png";
import whatsapp from "../public/assets/whatsapp3.png";
import linkedin from "../public/assets/linkedin3.png";



const signup = () => {

  const { toasts } = useToasterStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value })
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    const data = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      username: userData.firstName + userData.lastName,
      email: userData.email,
      password: userData.password
    }
    setIsLoading(true);

    SignupReqeust(data)
      .then(res => {
        // console.log(res.data.data);
        toast.success('Signup Successful');
        localStorage.setItem('token', res.data.data);
        localStorage.setItem('user', JSON.stringify(data.email));
        setIsLoading(false);
        router.push("/");
      }
      )
      .catch(err => {
        if (err.response) {
          setUserData({firstName: '', lastName: '', email: '', password: '' });
          setIsLoading(false);
          if (err.response.data.errors[0] === "Username already exists")
            toast.error("User with this email already exists")
          else
            toast.error(err.response.data.message)
        }
      }
      )
  }

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 3)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);



  return (
    <div className={style.container} id="canvas">
      <Toaster />
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


        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" type="text" value={userData.firstName} onChange={handleChange} required />

          <label htmlFor="lastName">Last name</label>
          <input id="lastName" type="text" value={userData.lastName} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={userData.email} onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={userData.password} onChange={handleChange} minLength={5} required />
          <div >
            <input id="checkbox" type="checkbox" required />
            <label htmlFor="checkbox">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>
          <button className={style.submitBtn} type="submit" >
            {isLoading ?
              <TailSpin
                height="15"
                width="50"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : `Sing Up`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default signup


