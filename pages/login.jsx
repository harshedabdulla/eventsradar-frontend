import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner'
import axios from 'axios';



import style from "../styles/Login.module.scss"
import logo from "../public/assets/loginlogo.svg";
import google from "../public/assets/google.png";
import instagram from "../public/assets/instagram3.png";
import whatsapp from "../public/assets/whatsapp3.png";
import linkedin from "../public/assets/linkedin3.png";



const login = () => {

  const { toasts } = useToasterStore();
  const router = useRouter();


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);


  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    }
    else if (id === 'password') {
      setPassword(value);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    setIsLoading(true);
    axios.post('https://api.events.cusat.me/user/login', JSON.stringify(data))
      .then(res => {
        console.log(res.data.data);
        localStorage.setItem('token', res.data.data);
        localStorage.setItem('user', JSON.stringify(data.email));
        setIsLoading(false);
        toast.success('Login Successful');
        router.push("/");
      }
      )
      .catch(err => {
        if (err.response) {
          setIsLoading(false);
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
    <>

      <div className={style.container} id="canvas">
        <Toaster />



        <div className={style.imageContainer}>
          <Image src={logo} alt="logo" width="300" className={style.logo} />
          <p>Don't have an account? <Link href="/signup">Sing up</Link></p>
          <div className={style.socialIcons}>
            <span><Image src={instagram} alt="logo" width="50" /></span>
            <span><Image src={whatsapp} alt="logo" width="60" /></span>
            <span><Image src={linkedin} alt="logo" width="50" /></span>

          </div>
        </div>

        <div className={`${style.signup_form} ${style.login}`}>

          <button className={style.GoogleBtn} >
            <Image src={google} alt="logo" width="20" />
            <p> Log In With Google</p>
          </button>
          <div className={`${style.hr} ${style.loginHr}`}>
            <hr />
            <span> Or </span>
            <hr />
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" >Email</label>
            <input id="email" type="email" value={email} onChange={handleChange} required />

            <label htmlFor="password" >Password</label>
            <input id="password" type="password" value={password} onChange={handleChange} required />


            <button className={`${style.submitBtn} ${style.loginSubmitBtn}`} type="submit">
              {isLoading ?
                  <TailSpin
                    height="15"
                    width="36"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />: `Login`}
            </button>
          </form>

        </div>
      </div>
    </>


  )
}

export default login


