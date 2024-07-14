import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";

function NavBar() {
  const links = [
    {
      label:'DashBoard',href:'/',id:1},
      {label:'issue',href:'/issue',id:2},
    
  ]
  return (
    <nav className='flex h-14 space-x-6 bottom-5 mb-5 px-5 items-center bg-slate-700'>
        <Link href="/" ><FaBug /></Link>
        <ul className='flex space-x-6'>
          {links.map(link => <Link key={link.id} className='text-zinc-500 hover:text-zinc-800 transition-colors' href={link.href}>{link.label}</Link>)}
            
            
        </ul>
      
    </nav>
  )
}

export default NavBar
