import React from 'react';
import { Pizza } from '../data/pizzas';

interface MenuProps {
  pizzaA: Pizza[];
  pizzaB: Pizza[];
}

const Menu: React.FC<MenuProps> = ({ pizzaA, pizzaB }) => {
  return (
    <section id="menu" className="py-20 bg-[#0f0f0f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 italic">Naše Menu</h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-lg italic">
            <div className="bg-black p-4 border border-gray-800 rounded">
              <span className="gold-accent font-bold">PIZZA A:</span> 33cm - 220 Kč | 40cm - 255 Kč
            </div>
            <div className="bg-black p-4 border border-gray-800 rounded">
              <span className="gold-accent font-bold">PIZZA B:</span> 33cm - 245 Kč | 40cm - 290 Kč
            </div>
          </div>
          <p className="mt-4 text-gray-500">Krabice na pizzu: 20 Kč</p>
        </div>

        <h3 className="text-3xl font-bold mb-10 border-l-4 border-gold pl-4 uppercase tracking-wider italic">Sekce A</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pizzaA.map((pizza, index) => (
            <div key={index} className="pizza-card bg-black border border-gray-800 rounded-2xl overflow-hidden transition">
              <img src={pizza.img} className="w-full h-48 object-cover" alt={pizza.name} />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 italic text-white">{index + 1}. {pizza.name}</h4>
                <p className="text-gray-400 text-sm italic leading-relaxed">{pizza.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-3xl font-bold mb-10 border-l-4 border-red-600 pl-4 uppercase tracking-wider italic">Sekce B</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzaB.map((pizza, index) => (
            <div 
              key={index} 
              className={`pizza-card bg-black border ${pizza.special ? 'border-gold border-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-gray-800'} rounded-2xl overflow-hidden transition`}
            >
              <img src={pizza.img} className="w-full h-48 object-cover" alt={pizza.name} />
              <div className="p-6">
                <h4 className={`text-xl font-bold mb-2 italic ${pizza.special ? 'gold-accent' : 'text-white'}`}>
                  {pizzaA.length + index + 1}. {pizza.name}
                </h4>
                <p className="text-gray-400 text-sm italic leading-relaxed">{pizza.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
