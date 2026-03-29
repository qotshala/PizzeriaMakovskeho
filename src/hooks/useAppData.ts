import { useState, useEffect } from 'react';
import { AppData, initialAppData } from '../data/pizzas';

export const useAppData = () => {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('pizzeria_app_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all nested properties exist by merging with initialAppData
        return {
          ...initialAppData,
          ...parsed,
          hero: parsed.hero ? { ...initialAppData.hero, ...parsed.hero } : initialAppData.hero,
          menu: parsed.menu ? { ...initialAppData.menu, ...parsed.menu } : initialAppData.menu,
          openingHours: parsed.openingHours ? { ...initialAppData.openingHours, ...parsed.openingHours } : initialAppData.openingHours,
          contact: parsed.contact ? { ...initialAppData.contact, ...parsed.contact } : initialAppData.contact,
        };
      } catch (e) {
        console.error("Failed to parse saved data", e);
        return initialAppData;
      }
    }
    return initialAppData;
  });

  useEffect(() => {
    localStorage.setItem('pizzeria_app_data', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: AppData) => {
    setData(newData);
  };

  return { data, updateData };
};
