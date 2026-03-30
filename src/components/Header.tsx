import React from 'react';

interface HeaderProps {
  phone: string;
}

const Header: React.FC<HeaderProps> = ({ phone }) => {
  return (
    <header className="fixed w-full z-50 sticky-header border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="flex flex-col cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to top"
        >
          <span className="text-2xl font-bold gold-accent tracking-tighter leading-none">PIZZERIA</span>
          <span className="text-xl font-light tracking-[0.2em] text-white">MAKOVSKÉHO</span>
        </div>
        <nav className="hidden lg:flex space-x-8 uppercase text-sm tracking-widest font-semibold text-gray-400">
          <a href="#domu" className="hover:text-amber-500 transition">Domů</a>
          <a href="#menu" className="hover:text-amber-500 transition">Menu</a>
          <a href="#oteviraci-doba" className="hover:text-amber-500 transition">Otevírací doba</a>
          <a href="#kontakt" className="hover:text-amber-500 transition">Kontakt</a>
        </nav>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="bg-gold text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-yellow-600 transition">
          {phone}
        </a>
      </div>
    </header>
  );
};

export default Header;
