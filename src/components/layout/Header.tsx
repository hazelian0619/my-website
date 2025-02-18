'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="#" className="text-xl font-medium font-['Pacifico']">Lian</Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link text-sm hover:text-primary transition-colors">HOME</Link>
            <Link href="/bio" className="nav-link text-sm hover:text-primary transition-colors">BIO</Link>
            <Link href="/research" className="nav-link text-sm hover:text-primary transition-colors">RESEARCH</Link>
            <Link href="/work" className="nav-link text-sm hover:text-primary transition-colors">WORK</Link>
            <Link href="/cv" className="nav-link text-sm hover:text-primary transition-colors">CV</Link>
            <Link href="/contact" className="nav-link text-sm hover:text-primary transition-colors">CONTACT</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 