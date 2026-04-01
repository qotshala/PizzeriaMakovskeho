import React, { useState } from "react";
import { useAppData } from "../hooks/useAppData";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import OpeningHours from "../components/OpeningHours";
import Footer from "../components/Footer";
import SurpriseModal from "../components/SurpriseModal";
import { Pizza } from "../data/pizzas";

const Home: React.FC = () => {
  const { data, loading } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomPizza, setRandomPizza] = useState<Pizza | null>(null);

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  const handleSurprise = () => {
    const allPizzas = [...data.menu.pizzaA, ...data.menu.pizzaB];
    const random = allPizzas[Math.floor(Math.random() * allPizzas.length)];
    setRandomPizza(random);
    setIsModalOpen(true);
  };

  return (
    <div
      className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('${data.globalBgImage}')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header phone={data.contact.phone} />
      <Hero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        bgImage={data.hero.bgImage}
        onSurprise={handleSurprise}
      />
      <Menu pizzaA={data.menu.pizzaA} pizzaB={data.menu.pizzaB} />
      <OpeningHours
        monThu={data.openingHours.monThu}
        friSat={data.openingHours.friSat}
        sun={data.openingHours.sun}
        phone={data.contact.phone}
      />
      <Footer />
      <SurpriseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pizza={randomPizza}
      />
    </div>
  );
};

export default Home;
