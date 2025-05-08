import React from 'react'
import NavbarComponent from './NavbarComponent'
import { Outlet } from 'react-router-dom'

const StructureLayout = () => {
  return (
    <div>
        <NavbarComponent/>
        <Outlet/>
    </div>
  )
}

export default StructureLayout