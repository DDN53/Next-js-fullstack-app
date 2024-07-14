'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';

function NavBar() {
   const currentPath = usePathname();
  const links = [
    {
      label:'DashBoard',href:'/',id:1},
      {label:'issue',href:'/issue',id:2},
    
  ]
  return (
    <nav className='flex h-14 space-x-6 bottom-5 mb-5 px-5 items-center bg-slate-700'>
        <Link href="/" ><FaBug /></Link>
        <ul className='flex space-x-6'>
        {links.map(link => <Link key={link.id} className={classnames({'text-zinc-500':link.href == currentPath,'text-zinc-600':link.href !== currentPath,'hover:text-zinc-800 transition-colors': true})} href={link.href}>{link.label}</Link>)}
            
            
        </ul>
      
    </nav>
  )
}

export default NavBar
