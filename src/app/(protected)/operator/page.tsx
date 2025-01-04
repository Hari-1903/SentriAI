import React from 'react'
import Image from 'next/image'
import {UserNav} from '@/components/operator/user-nav'
import {MainNav} from '@/components/operator/nav-bar'

const operator = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5FC] transition-opacity duration-500">
      <div className="border-b bg-[#FEFEFE]">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Image src="/logo.png" alt="search" width={100} height={100} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default operator
