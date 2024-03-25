import React, { useState } from "react";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { useRouter } from "next/navigation";

const shortid = require("shortid");

const Welcome = ({ onSessionSet }) => {
  const router = useRouter();
  const sessionId = shortid.generate();

  const handleCreate = () => {
    console.log("created");
    const id = sessionId;
    const usuarios = {};
    const sabores = {
      Calabaza: 0,
      Capresse: 0,
      Carne: 0,
      CarneACuchillo: 0,
      CarnePicante: 0,
      Cheeseburger: 0,
      Choclo: 0,
      CuatroQuesos: 0,
      JamonTomateAlbahaca: 0,
      JamonYQueso: 0,
      PancetaCiruela: 0,
      Pollo: 0,
      QuesoCebolla: 0,
      Roquefort: 0,
      VacioProvoleta: 0,
      Verdura: 0,
    };

    const db = getDatabase();
    set(ref(db, "sesiones/" + id), {
      sabores,
      usuarios,
    });

    router.push(`${id}`);
  };

  return (
    <section
      className="lg:w-1/3
      lg:h-1/2
      w-full
      h-auto
      flex flex-col
    "
    >
      <h1 className="mb-6 text-center text-2xl">Empanadas+</h1>
      <button
        className="border-2 rounded-md py-3 px-6 shadow-md border-white"
        onClick={handleCreate}
      >
        Crear Juntada
      </button>
    </section>
  );
};

export default Welcome;
