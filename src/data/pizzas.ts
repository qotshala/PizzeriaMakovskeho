export interface Pizza {
  name: string;
  desc: string;
  img: string;
  special?: boolean;
}

export interface AppData {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
  };
  globalBgImage: string;
  menu: {
    pizzaA: Pizza[];
    pizzaB: Pizza[];
  };
  openingHours: {
    monThu: string;
    friSat: string;
    sun: string;
  };
  contact: {
    phone: string;
    address: string;
  };
}

export const initialAppData: AppData = {
  hero: {
    title: "Makovského",
    subtitle: "Tradiční receptury, čerstvé suroviny a vášeň pro poctivou italskou pizzu přímo v Praze.",
    bgImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
  },
  globalBgImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000",
  menu: {
    pizzaA: [
      { name: "Margherita", desc: "rajčatová omáčka, mozzarella, bazalka", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=600" },
      { name: "Salami", desc: "rajčatová omáčka, mozzarella, salám", img: "https://images.unsplash.com/photo-1620374645310-f9d97e72326b?q=80&w=600" },
      { name: "Olivová", desc: "rajčatová omáčka, mozzarella, černé a zelené olivy, niva", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600" },
      { name: "Šunková", desc: "rajčatová omáčka, mozzarella, šunka, oregano", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600" },
      { name: "Al Tono", desc: "rajčatová omáčka, mozzarella, tuňák, cibule", img: "https://images.unsplash.com/photo-1593246049226-ded77bf50328?q=80&w=600" },
      { name: "Quattro Formaggi", desc: "bílý základ, mozzarella, niva, camembert, uzený sýr", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600" },
      { name: "Špenátová", desc: "rajčatová omáčka, mozzarella, špenát, niva, česnek", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600" },
      { name: "Al Funghi", desc: "rajčatová omáčka, mozzarella, žampiony, oregano", img: "https://images.unsplash.com/photo-1604909052743-94e8389803b2?q=80&w=600" },
      { name: "Slanina", desc: "rajčatová omáčka, mozzarella, slanina, cibule", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=600" },
      { name: "Hawai", desc: "rajčatová omáčka, mozzarella, šunka, ananas", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600" },
      { name: "Vegetariana", desc: "rajčatová omáčka, mozzarella, brokolice, rajčata, špenát", img: "https://images.unsplash.com/photo-1516100882582-76c9a444dd57?q=80&w=600" },
      { name: "Capricciosa", desc: "rajčatová omáčka, mozzarella, šunka, žampiony", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600" },
      { name: "Quattro Stagiony", desc: "rajčatová omáčka, mozzarella, 1/4 šunka, 1/4 salám, 1/4 žampiony, 1/4 feferonky", img: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=600" },
      { name: "Polo", desc: "rajčatová omáčka, mozzarella, kuřecí maso, niva", img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600" },
      { name: "Casa", desc: "rajčatová omáčka, mozzarella, šunka, niva, camembert", img: "https://images.unsplash.com/photo-151152857478e-94fbbf0d9846?q=80&w=600" },
      { name: "Maxi", desc: "bílý základ, mozzarella, šunka, rajčata, Quattro Formaggi", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600" },
      { name: "Viola", desc: "bílý základ, mozzarella, rajčata, kukuřice, cibule, Quattro Formaggi", img: "https://images.unsplash.com/photo-1574129810325-e17e2082b242?q=80&w=600" },
      { name: "Bianko", desc: "bílý základ, mozzarella, šunka, kukuřice, česnek", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=600" }
    ],
    pizzaB: [
      { name: "Ďábelská", desc: "rajčatová omáčka, mozzarella, pikantní salám (ventricina), jalapeños", img: "https://images.unsplash.com/photo-1593560708920-61dd723b5bb4?q=80&w=600" },
      { name: "Mexicana", desc: "rajčatová omáčka, mozzarella, pikantní salám (ventricina), jalapeños, kukuřice", img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=600" },
      { name: "Mista", desc: "rajčatová omáčka, mozzarella, salám, šunka, žampiony, jalapeños", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600" },
      { name: "Roma", desc: "rajčatová omáčka, mozzarella, šunka, anglická slanina, žampiony, jalapeños", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600" },
      { name: "Picanta", desc: "rajčatová omáčka, mozzarella, kuřecí maso, šunka, klobása, jalapeños", img: "https://images.unsplash.com/photo-1594007759138-855170ec8dc0?q=80&w=600" },
      { name: "Cipola", desc: "bílý základ, anglická slanina, cibule, Quattro Formaggi", img: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=600" },
      { name: "Fati", desc: "bílý základ, mozzarella, šunka, anglická slanina, kuřecí maso, jalapeños", img: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?q=80&w=600" },
      { name: "Vitta", desc: "rajčatová omáčka, mozzarella, anglická slanina, žampiony, olivy", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600" },
      { name: "Fantasia", desc: "rajčatová omáčka, mozzarella, salám, červená cibule, kukuřice", img: "https://images.unsplash.com/photo-1604909052743-94e8389803b2?q=80&w=600" },
      { name: "Makovského", desc: "bílý základ, mozzarella, kuřecí maso, salám, špenát, jalapeños", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600", special: true },
      { name: "Texas", desc: "rajčatová omáčka, mozzarella, klobása, anglická slanina, kukuřice, cibule", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=600" },
      { name: "New York", desc: "rajčatová omáčka, mozzarella, salám, šunka, žampiony, olivy, červená cibule", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600" },
      { name: "Hot Hot", desc: "rajčatová omáčka, mozzarella, salám, slanina, jalapeños, červená cibule, omáčka siracha", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600" },
      { name: "Diavola", desc: "rajčatová omáčka, mozzarella, slanina, salám, jalapeños, klobása, chilli", img: "https://images.unsplash.com/photo-1593560708920-61dd723b5bb4?q=80&w=600" },
      { name: "Gabi", desc: "rajčatová omáčka, mozzarella, pikantní salám, šunka, slanina, smetanová zálivka, česnek", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600" },
      { name: "Beny", desc: "bílý základ, mozzarella, niva, camembert, kuřecí maso, bazalka", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=600" },
      { name: "Eri", desc: "rajčatová omáčka, mozzarella, slanina, salám, paprika míchaná, červená cibule", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600" },
      { name: "Brusinková", desc: "bílý základ, mozzarella, šunka, camembert, brusinky", img: "https://images.unsplash.com/photo-151152857478e-94fbbf0d9846?q=80&w=600" }
    ]
  },
  openingHours: {
    monThu: "11:00 – 22:00",
    friSat: "11:00 – 23:00",
    sun: "11:00 – 22:00"
  },
  contact: {
    phone: "+420 777 513 848",
    address: "Makovského 1394/8a, Praha 17"
  }
};
