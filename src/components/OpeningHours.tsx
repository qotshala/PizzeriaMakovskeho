import React from 'react';
import { PIZZERIA_ADDRESS } from '../constants/location';

interface OpeningHoursProps {
  monThu: string;
  friSat: string;
  sun: string;
  phone: string;
  address: string;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ monThu, friSat, sun, phone }) => {
  return (
    <section id="oteviraci-doba" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-4xl font-bold mb-8 italic">Otevírací doba</h3>
          <div className="space-y-4 text-lg bg-zinc-900/50 p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span>Pondělí – Čtvrtek</span>
              <span className="gold-accent font-bold">{monThu}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span>Pátek – Sobota</span>
              <span className="gold-accent font-bold">{friSat}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span>Neděle</span>
              <span className="gold-accent font-bold">{sun}</span>
            </div>
          </div>
          <div id="kontakt" className="mt-12">
            <h3 className="text-4xl font-bold mb-4 italic">Objednávky</h3>
            <p className="text-4xl gold-accent font-bold mb-2">{phone}</p>
            <p className="text-gray-400 tracking-widest uppercase text-sm">{PIZZERIA_ADDRESS}</p>
          </div>
        </div>
        <div className="h-[450px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <iframe 
            src={`https://www.google.com/maps?q=${encodeURIComponent(PIZZERIA_ADDRESS)}&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
