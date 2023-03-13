import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

function Landing() {
  return (
    <main>
      <nav>
        <img src={logo} alt="logo" className='logo' />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>Tracking</span> app</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat inventore nihil unde maxime.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quod? Voluptatem quisquam repellendus dolorem sunt dolorum.
          </p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt="hero logo of landing page" className='img main-img' />
      </div>
    </main>
  )
}

export default Landing