import React from 'react'
import LoginSignUp from './LoginSignUp'
import FeaturedEvents from './FeaturedEvents'
import Follow from './Follow'

const Sidebar = () => {
  return (
    <div className="col-span-2 hidden sm:hidden md:hidden flex-col gap-4 sticky top-0 h-screen">
        <LoginSignUp />
        <FeaturedEvents />
        <Follow />
    </div>
  )
}

export default Sidebar
