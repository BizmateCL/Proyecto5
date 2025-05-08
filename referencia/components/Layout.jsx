import React from 'react'
import NavbarComponent from './NavbarComponent'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <NavbarComponent />
        <Outlet />
        {/* footer */}
    </div>
  )
}

export default Layout