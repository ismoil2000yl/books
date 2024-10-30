import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './header'
import Footer from './footer'

const index = () => {

  return (
    <div className="w-full bg-contain bg-no-repeat bg-left h-[100vh]" style={{ backgroundImage: "url('/bg.png')" }}>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default index