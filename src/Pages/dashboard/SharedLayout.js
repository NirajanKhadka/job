import React from 'react'
import {Navbar,SmallSideBar,BigSideBar} from '../../components'
import {Outlet} from 'react-router-dom'
import Wrappper from '../../assets/wrappers/SharedLayout'

function SharedLayout() {
  return (
    <Wrappper>
      <main className='dashboard'>
        <SmallSideBar />
        <BigSideBar />
      <div>
        <Navbar />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
      </main>
    </Wrappper>
  )
}

export default SharedLayout