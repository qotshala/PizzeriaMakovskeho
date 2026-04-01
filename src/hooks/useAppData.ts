import { useCallback, useEffect, useState } from 'react';
import { AppData, initialAppData } from '../data/pizzas';
import { supabase } from '../lib/supabaseClient';
import { PIZZERIA_ADDRESS } from '../constants/location';

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
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<AppData>(() => ensurePizzaIds(initialAppData));

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const { data: row, error } = await supabase
          .from('app_data')
          .select('data')
          .eq('id', 1)
          .single();

        if (error) throw error;

        const remote = (row?.data ?? {}) as Partial<AppData>;
        const merged: AppData = ensurePizzaIds({
          ...initialAppData,
          ...remote,
          hero: remote.hero ? { ...initialAppData.hero, ...remote.hero } : initialAppData.hero,
          menu: remote.menu ? { ...initialAppData.menu, ...remote.menu } : initialAppData.menu,
          openingHours: remote.openingHours
            ? { ...initialAppData.openingHours, ...remote.openingHours }
            : initialAppData.openingHours,
          contact: remote.contact ? { ...initialAppData.contact, ...remote.contact } : initialAppData.contact,
        });

        merged.contact.address = PIZZERIA_ADDRESS;
        if (isMounted) setData(merged);
      } catch (e) {
        console.error('Failed to load data from Supabase', e);
        if (isMounted) setStorageError('Nepodařilo se načíst data ze serveru. Zkuste to prosím znovu.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateData = useCallback(async (newData: AppData) => {
    setStorageError(null);
    const patched: AppData = { ...newData, contact: { ...newData.contact, address: PIZZERIA_ADDRESS } };
    setData(patched);

    try {
      const { error } = await supabase.from('app_data').update({ data: patched }).eq('id', 1);
      if (error) throw error;
    } catch (e) {
      console.error('Failed to save data to Supabase', e);
      setStorageError('Nepodařilo se uložit změny na server. Zkontrolujte připojení a zkuste to znovu.');
    }
  }, []);

  return { data, updateData, storageError, loading };
};
