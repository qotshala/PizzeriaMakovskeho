import { useState, useEffect } from 'react';
import { AppData, initialAppData } from '../data/pizzas';

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const ensurePizzaIds = (appData: AppData): AppData => {
  const ensure = (pizzas: AppData['menu']['pizzaA']) =>
    pizzas.map((p) => (p.id ? p : { ...p, id: createId() }));

  return {
    ...appData,
    menu: {
      ...appData.menu,
      pizzaA: ensure(appData.menu.pizzaA),
      pizzaB: ensure(appData.menu.pizzaB),
    },
  };
};

export const useAppData = () => {
  const [storageError, setStorageError] = useState<string | null>(null);

  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('pizzeria_app_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return ensurePizzaIds({
          ...initialAppData,
          ...parsed,
          hero: parsed.hero ? { ...initialAppData.hero, ...parsed.hero } : initialAppData.hero,
          menu: parsed.menu ? { ...initialAppData.menu, ...parsed.menu } : initialAppData.menu,
          openingHours: parsed.openingHours ? { ...initialAppData.openingHours, ...parsed.openingHours } : initialAppData.openingHours,
          contact: parsed.contact ? { ...initialAppData.contact, ...parsed.contact } : initialAppData.contact,
        });
      } catch (e) {
        console.error("Failed to parse saved data", e);
        return ensurePizzaIds(initialAppData);
      }
    }
    return ensurePizzaIds(initialAppData);
  });

  useEffect(() => {
    try {
      localStorage.setItem('pizzeria_app_data', JSON.stringify(data));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        setStorageError('Úložiště je plné. Použijte menší obrázky nebo smažte nepoužívané.');
      } else {
        console.error('Failed to save data', e);
      }
    }
  }, [data]);

  const updateData = (newData: AppData) => {
    setStorageError(null);
    setData(newData);
  };

  return { data, updateData, storageError };
};
