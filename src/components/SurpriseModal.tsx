import React, { useEffect, useState } from 'react';
import { Pizza } from '../data/pizzas';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizza: Pizza | null;
}

const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose, pizza }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsActive(true), 10);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  if (!isOpen || !pizza) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`bg-zinc-900 border-2 border-gold p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-90'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
        <h3 className="gold-accent text-sm uppercase tracking-[0.3em] mb-2 font-bold">Dnešní doporučení:</h3>
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-800">
          <img src={pizza.img} className="w-full h-48 object-cover" alt={pizza.name} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 italic">{pizza.name}</h2>
        <p className="text-gray-400 italic mb-6 text-sm">{pizza.desc}</p>
        <button 
          onClick={onClose} 
          className="bg-gold text-black px-10 py-3 uppercase tracking-widest font-bold hover:bg-yellow-600 transition"
        >
          Skvělé!
        </button>
      </div>
    </div>
  );
};

export default SurpriseModal;
