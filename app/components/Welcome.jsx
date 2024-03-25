import React, { useState } from "react";
import { getDatabase, ref, set, onValue, update } from "firebase/database";

const shortid = require("shortid");

const Welcome = ({ onSessionSet }) => {
  const sessionId = shortid.generate();
  const [userName, setUserName] = useState("");
  const [code, setCode] = useState("");
  const [open, setOpen] = useState("crear");

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    const id = sessionId;
    const name = userName;
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

    const db = getDatabase();
    set(ref(db, "sesiones/" + id), {
      creator: name,
      sabores,
      usuarios,
    });

    onSessionSet(id, name);
    setUserName("");
  };

  const handleCodeSubmit = () => {
    const name = userName;
    const id = code;

    const db = getDatabase();

    const sessionRef = ref(db, "sesiones/" + id);
    onValue(sessionRef, (snapshot) => {
      const existingData = snapshot.val();
      if (
        existingData &&
        existingData.usuarios &&
        existingData.usuarios[name]
      ) {
        onSessionSet(code, name);
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
            // console.log("User added to session successfully");
            onSessionSet(code, name);
          })
          .catch((error) => {
            console.error("Error adding user to session:", error);
          });
      }
    });
  };

  return (
    <section
      className="md:w-1/3
      md:h-1/2
      w-full
      h-auto
    "
    >
      <h1 className="mb-4 text-center text-2xl">Empanadas+</h1>
      <div className="flex">
        <h2
          className="bg-black/5 px-4 py-1 mr-1 rounded-t-md cursor-pointer"
          onClick={() => setOpen("crear")}
        >
          Crear
        </h2>
        <h2
          className="bg-black/5 px-4 py-1 rounded-t-md cursor-pointer"
          onClick={() => setOpen("entrar")}
        >
          Entrar
        </h2>
      </div>
      {open === "entrar" && (
        <div className="bg-black/5 flex flex-col p-4 rounded-b-md rounded-tr-md">
          <label>Tu Código:</label>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            required
          />
          <label>Tu Nombre:</label>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            required
          />
          <button className="secondary mt-4" onClick={handleCodeSubmit}>
            Acceder
          </button>
        </div>
      )}
      {open === "crear" && (
        <div className="bg-black/5 flex flex-col p-4 rounded-b-md rounded-tr-md">
          <label>Tu Nombre:</label>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            required
          />
          <button className="secondary" onClick={handleSubmit}>
            Crear Juntada
          </button>
        </div>
      )}
    </section>
  );
};

export default Welcome;
