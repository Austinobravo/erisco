import React from 'react'
import ChangeNavigation from '../_components/changeNavigation'
import LoginForm from './_components/LoginForm'

const page = () => {
 
  return (
    <div className='flex flex-col space-y-7 py-20 justify-center items-center px-10'>
        <div>
            <ChangeNavigation/>
        </div>
        <LoginForm/>
      
    </div>
  )
}

export default page
