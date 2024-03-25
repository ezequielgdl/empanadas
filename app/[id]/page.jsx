"use client";
import React, { useState } from "react";
import Session from "../components/Session";
import { getDatabase, update, ref, onValue } from "firebase/database";
import { app } from "@/app/page";

const database = getDatabase(app);

const page = ({ params }) => {
  const [user, setUser] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const session = params.id;

  const handleNameChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = () => {
    const name = user;
    const id = session;
    const db = database;
    const usuarios = {
      [name]: {
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
      },
    };
    const sessionRef = ref(db, "sesiones/" + id);
    onValue(sessionRef, (snapshot) => {
      const existingData = snapshot.val();
      if (
        existingData &&
        existingData.usuarios &&
        existingData.usuarios[name]
      ) {
        setSubmitted(true);
      } else {
        const updatedData = {
          ...existingData,
          usuarios: {
            ...existingData.usuarios,
            [name]: {
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
            },
          },
        };

        update(ref(db, "sesiones/" + id), updatedData)
          .then(() => {
            setSubmitted(true);
          })
          .catch((error) => {
            console.error("Error adding user to session:", error);
          });
      }
    });
  };

  return (
    <section className="flex flex-col items-center p-2 md:p-12 justify-center">
      {submitted ? (
        <Session session={session} database={database} user={user} />
      ) : (
        <div className="flex flex-col items-center">
          <label>Tu Nombre:</label>
          <input
            type="text"
            value={user}
            onChange={handleNameChange}
            required
          />
          <button className="secondary mt-4" onClick={handleSubmit}>
            Acceder
          </button>
        </div>
      )}
    </section>
  );
};

export default page;
