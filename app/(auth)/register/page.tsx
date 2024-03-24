
import React from 'react'
import ChangeNavigation from '../_components/changeNavigation'
import RegisterForm from './_components/RegisterForm'

const page = () => {

  return (
    <div className='flex flex-col space-y-7 py-20 justify-center items-center px-10 '>
        <div>
            <ChangeNavigation/>
        </div>
        <RegisterForm/>
      
    </div>
  )
}

export default page
