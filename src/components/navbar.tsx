// This is the navbar component. 
// It is used in the main page to provide navigation and branding.
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/assets/raspberrypower.png" alt="Logo" width={100} height={100} />
          <span className="text-white text-lg font-bold">Towo Monitor</span>
        </Link>
        <button onClick={toggleMenu} className="text-white md:hidden">
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-4`}>
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/ai" className="text-white hover:text-gray-300">AI & ML</Link>
          <Link href="/games" className="text-white hover:text-gray-300">Quick Games</Link>
          <Link href="/journal" className="text-white hover:text-gray-300">Journal</Link>
          <Link href="/connect" className="text-white hover:text-gray-300">Connect</Link>
        </div>
      </div>
    </nav>
  );
}