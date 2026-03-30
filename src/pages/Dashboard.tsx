import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../hooks/useAppData';
import { Pizza } from '../data/pizzas';

const Dashboard: React.FC = () => {
  const { data, updateData } = useAppData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hero' | 'menuA' | 'menuB' | 'info'>('hero');

  useEffect(() => {
    const auth = localStorage.getItem('pizzeria_auth');
    if (auth !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('pizzeria_auth');
    navigate('/login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      hero: { ...data.hero, [name]: value }
    });
  };

  const handleHeroImageUpload = (base64: string) => {
    updateData({
      ...data,
      hero: { ...data.hero, bgImage: base64 }
    });
  };

  const handleGlobalImageUpload = (base64: string) => {
    updateData({
      ...data,
      globalBgImage: base64
    });
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in data.openingHours) {
      updateData({
        ...data,
        openingHours: { ...data.openingHours, [name]: value }
      });
    } else {
      updateData({
        ...data,
        contact: { ...data.contact, [name]: value }
      });
    }
  };

  const handlePizzaChange = (section: 'pizzaA' | 'pizzaB', index: number, field: keyof Pizza, value: string | boolean) => {
    const newPizzas = [...data.menu[section]];
    newPizzas[index] = { ...newPizzas[index], [field]: value };
    updateData({
      ...data,
      menu: { ...data.menu, [section]: newPizzas }
    });
  };

  const handlePizzaImageUpload = (section: 'pizzaA' | 'pizzaB', index: number, base64: string) => {
    const newPizzas = [...data.menu[section]];
    newPizzas[index] = { ...newPizzas[index], img: base64 };
    updateData({
      ...data,
      menu: { ...data.menu, [section]: newPizzas }
    });
  };

  const addPizza = (section: 'pizzaA' | 'pizzaB') => {
    const newPizza: Pizza = { name: 'New Pizza', desc: 'Description', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600' };
    updateData({
      ...data,
      menu: { ...data.menu, [section]: [...data.menu[section], newPizza] }
    });
  };

  const removePizza = (section: 'pizzaA' | 'pizzaB', index: number) => {
    const newPizzas = data.menu[section].filter((_, i) => i !== index);
    updateData({
      ...data,
      menu: { ...data.menu, [section]: newPizzas }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <h1
            className="text-3xl font-bold gold-accent italic cursor-pointer select-none"
            onClick={() => navigate('/')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/');
            }}
            aria-label="Go to homepage"
          >
            Pizzeria Dashboard
          </h1>
          <div className="flex gap-4">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition">View Site</button>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Logout</button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {(['hero', 'menuA', 'menuB', 'info'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold transition uppercase tracking-widest text-sm whitespace-nowrap ${activeTab === tab ? 'bg-gold text-black' : 'bg-zinc-900 text-gray-400 hover:text-white'}`}
            >
              {tab === 'hero' ? 'Hero Section' : tab === 'menuA' ? 'Pizza Section A' : tab === 'menuB' ? 'Pizza Section B' : 'General Info'}
            </button>
          ))}
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 italic">Hero Section Settings</h2>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Title Accent</label>
                <input type="text" name="title" value={data.hero.title} onChange={handleHeroChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Subtitle</label>
                <textarea name="subtitle" value={data.hero.subtitle} onChange={handleHeroChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold h-24" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Hero Background Image URL</label>
                  <input type="text" name="bgImage" value={data.hero.bgImage} onChange={handleHeroChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold mb-2" />
                  <div className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-700 hover:border-gold transition h-40">
                    <img src={data.hero.bgImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition" alt="Hero Preview" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold uppercase tracking-widest bg-black/50 px-4 py-2 rounded">Tap to Upload Photo</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, handleHeroImageUpload)} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>
                <div className="pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-800 md:pl-6">
                  <h2 className="text-2xl font-bold mb-4 italic">Global Background</h2>
                  <label className="block text-gray-400 text-sm mb-1">Overall Site Background Image URL</label>
                  <input 
                    type="text" 
                    value={data.globalBgImage} 
                    onChange={(e) => updateData({ ...data, globalBgImage: e.target.value })} 
                    className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold mb-2" 
                  />
                  <div className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-700 hover:border-gold transition h-40">
                    <img src={data.globalBgImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition" alt="Global Preview" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold uppercase tracking-widest bg-black/50 px-4 py-2 rounded">Tap to Upload Photo</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, handleGlobalImageUpload)} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'menuA' || activeTab === 'menuB') && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold italic">{activeTab === 'menuA' ? 'Section A' : 'Section B'} Pizzas</h2>
                <button onClick={() => addPizza(activeTab === 'menuA' ? 'pizzaA' : 'pizzaB')} className="bg-gold text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 transition">+ Add Pizza</button>
              </div>
              <div className="grid gap-6">
                {data.menu[activeTab === 'menuA' ? 'pizzaA' : 'pizzaB'].map((pizza, index) => (
                  <div key={index} className="bg-black p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 h-32 flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-lg border border-gray-700 hover:border-gold transition">
                      <img src={pizza.img} className="w-full h-full object-cover group-hover:opacity-70 transition" alt={pizza.name} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-black/70 px-2 py-1 rounded">Upload</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, (base64) => handlePizzaImageUpload(activeTab === 'menuA' ? 'pizzaA' : 'pizzaB', index, base64))} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    <div className="flex-grow grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-500 text-xs mb-1">Name</label>
                        <input type="text" value={pizza.name} onChange={(e) => handlePizzaChange(activeTab === 'menuA' ? 'pizzaA' : 'pizzaB', index, 'name', e.target.value)} className="w-full bg-zinc-900 border border-gray-800 rounded p-2 text-white outline-none focus:border-gold" />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-xs mb-1">Image URL (or upload left)</label>
                        <input type="text" value={pizza.img} onChange={(e) => handlePizzaChange(activeTab === 'menuA' ? 'pizzaA' : 'pizzaB', index, 'img', e.target.value)} className="w-full bg-zinc-900 border border-gray-800 rounded p-2 text-white outline-none focus:border-gold" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-500 text-xs mb-1">Description</label>
                        <input type="text" value={pizza.desc} onChange={(e) => handlePizzaChange(activeTab === 'menuA' ? 'pizzaA' : 'pizzaB', index, 'desc', e.target.value)} className="w-full bg-zinc-900 border border-gray-800 rounded p-2 text-white outline-none focus:border-gold" />
                      </div>
                      {activeTab === 'menuB' && (
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={pizza.special} onChange={(e) => handlePizzaChange('pizzaB', index, 'special', e.target.checked)} className="w-4 h-4 accent-gold" />
                          <label className="text-sm text-gray-400">Special (Gold Border)</label>
                        </div>
                      )}
                    </div>
                    <div className="flex items-end">
                      <button onClick={() => removePizza(activeTab === 'menuA' ? 'pizzaA' : 'pizzaB', index)} className="text-red-500 hover:text-red-400 p-2">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 italic">General Information Settings</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="gold-accent font-bold uppercase tracking-widest text-sm">Opening Hours</h3>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Mon – Thu</label>
                    <input type="text" name="monThu" value={data.openingHours.monThu} onChange={handleInfoChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Fri – Sat</label>
                    <input type="text" name="friSat" value={data.openingHours.friSat} onChange={handleInfoChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Sunday</label>
                    <input type="text" name="sun" value={data.openingHours.sun} onChange={handleInfoChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="gold-accent font-bold uppercase tracking-widest text-sm">Contact Info</h3>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Phone Number</label>
                    <input type="text" name="phone" value={data.contact.phone} onChange={handleInfoChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Address</label>
                    <input type="text" name="address" value={data.contact.address} onChange={handleInfoChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white outline-none focus:border-gold" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
