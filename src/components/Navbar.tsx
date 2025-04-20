'use client';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { title: 'Products', items: ['Product 1', 'Product 2'] },
    { title: 'Company', items: ['About Us', 'Careers'] },
    { title: 'Resources', items: ['Docs', 'Help Center'] },
  ];
  
  return (
    <div className="relative z-50">
      {/* Floating Navbar Container */}
      <nav className="fixed top-4 right-4 bg-[#0b122d] text-white rounded-l-[30px] rounded-r-[16px] px-3 py-2 md:px-6 shadow-lg max-w-[90%] md:max-w-[70%] lg:max-w-[55%] text-sm">
        <div className="flex justify-between items-center flex-wrap">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.simbian.jpg" alt="Logo" width={28} height={28} priority />
            <span className="font-bold text-base md:text-lg">Simbian</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <Dropdown title="Products" items={['Product 1', 'Product 2']} />
            <Dropdown title="Company" items={['About Us', 'Careers']} />
            <Dropdown title="Resources" items={['Docs', 'Help Center']} />
            <Link href="#" className="hover:underline">Blog</Link>

            <Link href="#" className="ml-3 bg-white text-[#0b122d] px-3 py-1.5 rounded-full font-medium text-sm flex items-center space-x-1">
              <span>Book a Demo</span>
            </Link>

          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden ml-auto" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3">
           {navLinks.map((section) => (
  <Dropdown key={section.title} {...section} />
))}

            <Link href="#" className="block font-semibold">Blog</Link>
            <Link href="#" className="block w-full text-center mt-2 bg-white text-[#0b122d] px-4 py-2 rounded-full font-semibold">
              Book a Demo
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

type DropdownProps = {
  title: string;
  items: string[];
};

const Dropdown = ({ title, items }: DropdownProps) => (
  <div className="relative group cursor-pointer">
    <div className="flex items-center space-x-1">
      <span>{title}</span>
      <ChevronDown size={16} />
    </div>
    <div className="absolute hidden group-hover:block bg-white text-black mt-2 py-2 rounded shadow-md w-40 z-10">
      {items.map((item, index) => (
        <Link key={index} href="#" className="block px-4 py-2 hover:bg-gray-100">
          {item}
        </Link>
      ))}
    </div>
  </div>
);

const DropdownMobile = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-1">
    <p className="font-semibold">{title}</p>
    {items.map((item, index) => (
      <Link key={index} href="#" className="block pl-4 text-sm">
        {item}
      </Link>
    ))}
  </div>
);

export default Navbar;
