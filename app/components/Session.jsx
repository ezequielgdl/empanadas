"use client";
import React, { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import UserData from "./UserData";

const Session = ({ database, session, user }) => {
  const [empanadas, setEmpanadas] = useState({});
  const [userEmpanadas, setUserEmpanadas] = useState({});
  const [usuarios, setUsuarios] = useState({});

  useEffect(() => {
    const empanadasDB = ref(database, "sesiones/" + session);
    onValue(empanadasDB, (snapshot) => {
      const data = snapshot.val();
      setUsuarios(data.usuarios);
      setEmpanadas(data.sabores);
    });
    const userEmpanadasDB = ref(
      database,
      "sesiones/" + session + "/usuarios/" + user
    );
    onValue(userEmpanadasDB, (snapshot) => {
      const data = snapshot.val();
      setUserEmpanadas(data);
    });
  }, []);

  const handleIncrement = (flavor) => {
    const updatedEmpanadas = { ...empanadas };
    const updatedUserEmpanadas = { ...userEmpanadas };
    updatedEmpanadas[flavor] = (updatedEmpanadas[flavor] || 0) + 1;
    updatedUserEmpanadas[flavor] = (updatedUserEmpanadas[flavor] || 0) + 1;
    updateDatabase(updatedEmpanadas, updatedUserEmpanadas);
  };

  const handleDecrement = (flavor) => {
    const updatedEmpanadas = { ...empanadas };
    const updatedUserEmpanadas = { ...userEmpanadas };
    updatedEmpanadas[flavor] = Math.max((updatedEmpanadas[flavor] || 0) - 1, 0);
    updatedUserEmpanadas[flavor] = Math.max(
      (updatedUserEmpanadas[flavor] || 0) - 1,
      0
    );
    updateDatabase(updatedEmpanadas, updatedUserEmpanadas);
  };

  const updateDatabase = (updatedData, updatedUserData) => {
    const updates = {};
    for (const [flavor, count] of Object.entries(updatedData)) {
      updates[`sesiones/${session}/sabores/${flavor}`] = count;
    }
    for (const [flavor, count] of Object.entries(updatedUserData)) {
      updates[`sesiones/${session}/usuarios/${user}/${flavor}`] = count;
    }
    update(ref(database), updates)
      .then(() => {
        console.log("database updated");
        // Database update successful
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  };

  return (
    <section className="flex md:flex-row flex-col w-full justify-center">
      <div className="flex flex-col border-2 border-white rounded-md py-4 md:mx-4 md:w-1/3 mb-4 md:mb-0">
        <h1 className="w-full text-center text-3xl font-bold mb-2 text-">
          Empanadas+
        </h1>
        <p className="w-full text-center text-lg font-bold mb-2 text-">
          Hola {user}
        </p>
        {Object.entries(empanadas).map(([flavor, count]) => (
          <div
            className="border-b-2 border-white flex justify-between items-center p-2"
            key={flavor}
          >
            <label className="">{flavor.split(/(?=[A-Z])/).join(" ")}</label>
            <span className="">
              <button
                className="mx-3 bg-white w-8 rounded-full text-slate-400"
                onClick={() => handleDecrement(flavor)}
              >
                -
              </button>
              <span className="text-lg">{count}</span>
              <button
                className="mx-3 bg-white w-8 rounded-full text-slate-400"
                onClick={() => handleIncrement(flavor)}
              >
                +
              </button>
            </span>
          </div>
        ))}
      </div>
      <UserData users={usuarios} />
    </section>
  );
};

export default Session;
