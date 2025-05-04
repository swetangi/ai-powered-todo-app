import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-16 bg-blue-800 text-white'>
    <div className='logo mx-5 text-xl font-bold'>iTodo</div>
    <div className='menus mx-5'>
      <ul className='flex gap-5'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/">About</Link></li>
        <li><Link href="/">Contact</Link></li>
      </ul>
    </div>
    </div>
  )
}

export default Navbar
