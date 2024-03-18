import React from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <section>
        <nav className='md:flex hidden'>
            <DesktopNav/>
        </nav>
        <nav className='md:hidden block'>
            <MobileNav/>
        </nav>
      
    </section>
  )
}

export default Navbar
