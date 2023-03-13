import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components'
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <Wrapper>
    <main>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>Tracking</span> app</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat inventore nihil unde maxime.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quod? Voluptatem quisquam repellendus dolorem sunt dolorum.
          </p>
          <Link to = "/register" className='btn btn-hero'>Login/Register</Link>
        </div>
        <img src={main} alt="hero logo of landing page" className='img main-img' />
      </div>
    </main>
    </Wrapper>

  )
}

export default Landing