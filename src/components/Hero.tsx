import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
  onSurprise: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, bgImage, onSurprise }) => {
  return (
    <section id="domu" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={bgImage} className="w-full h-full object-cover opacity-40 md:opacity-50" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-4 inline-block">
          <span className="gold-accent text-sm md:text-base uppercase tracking-[0.4em] font-bold">Tradiční Italská Chuť</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-bold mb-6 text-white leading-tight drop-shadow-2xl">
          Pizzeria <br />
          <span className="gold-accent italic">{title}</span>
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto font-light text-gray-200 mb-10 leading-relaxed drop-shadow-lg">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#menu" className="w-full sm:w-auto bg-gold text-black px-10 py-4 uppercase tracking-widest font-bold hover:bg-yellow-600 transition duration-300 shadow-xl">
            Zobrazit Menu
          </a>
          <button 
            onClick={onSurprise} 
            className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-white hover:text-black transition duration-300 italic backdrop-blur-sm"
          >
            Překvap mě!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
