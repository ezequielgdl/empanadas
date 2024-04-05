"use client";
import React, { useEffect, useState } from "react";
import Session from "../components/Session";
import { getDatabase, update, ref, onValue } from "firebase/database";
import { app } from "@/app/page";
import { useRouter } from "next/navigation";

const database = getDatabase(app);

const Page = ({ params }) => {
  const [user, setUser] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const session = params.id;
  const router = useRouter();

  useEffect(() => {
    const sessionRef = ref(database, "sesiones/" + session);
    onValue(sessionRef, (snapshot) => {
      const existingData = snapshot.val();
      if (!existingData) {
        router.push("/");
      }
    });
  }, []);

  const handleNameChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = () => {
    const name = user;
    const id = session;
    const db = database;

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
    <section className="flex flex-col p-6 lg:p-12 h-screen sm:items-center">
      {submitted ? (
        <Session session={session} database={database} user={user} />
      ) : (
        <div className="flex flex-col h-full items-center justify-center lg:w-1/4">
          <label className="font-['Magofah'] text-3xl text-center">
            Tu Nombre:
          </label>
          <input
            type="text"
            value={user}
            onChange={handleNameChange}
            required
          />
          <button
            className="border-2 rounded-md py-1 px-6 shadow-md mt-4"
            onClick={handleSubmit}
          >
            Acceder
          </button>
        </div>
      )}
    </section>
  );
};

export default Page;
