import { getCurrentUser } from '@/lib/currentuser'
import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'

const UserLayout = async ({children}: {children: React.ReactNode}) => {
    const user = await getCurrentUser()
    if(user) redirect(`/`)
  return (
    <div>
      {children}
    </div>
  )
}

export default UserLayout
