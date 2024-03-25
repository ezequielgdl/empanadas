"use client";
import React, { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";

const Session = ({ database, session, user, params }) => {
  console.log(params.id);
  const [empanadas, setEmpanadas] = useState({});
  console.log("Logged user is", user);

  useEffect(() => {
    const empanadasDB = ref(database, "sesiones/" + session);
    onValue(empanadasDB, (snapshot) => {
      const data = snapshot.val();
      setEmpanadas(data.sabores);
    });
  }, []);

  const handleIncrement = (flavor) => {
    const updatedEmpanadas = { ...empanadas };
    updatedEmpanadas[flavor] = (updatedEmpanadas[flavor] || 0) + 1;
    updateDatabase(updatedEmpanadas);
  };

  const handleDecrement = (flavor) => {
    const updatedEmpanadas = { ...empanadas };
    updatedEmpanadas[flavor] = Math.max((updatedEmpanadas[flavor] || 0) - 1, 0);
    updateDatabase(updatedEmpanadas);
  };

  const updateDatabase = (updatedData) => {
    const updates = {};
    for (const [flavor, count] of Object.entries(updatedData)) {
      updates[`sesiones/${session}/sabores/${flavor}`] = count;
      updates[`sesiones/${session}/usuarios/${user}/${flavor}`] = count;
    }
    update(ref(database), updates)
      .then(() => {
        console.log(updates);
        // Database update successful
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  };

  return (
    <div className="w-1/3 flex flex-col border-2 border-white rounded-md py-4">
      <h1 className="w-full text-center text-lg font-bold mb-2 text-">
        Empanadas+
      </h1>
      {Object.entries(empanadas).map(([flavor, count]) => (
        <div
          className="border-b-2 border-white mb-2 flex justify-between align-center"
          key={flavor}
        >
          <label className="px-3">{flavor.split(/(?=[A-Z])/).join(" ")}</label>
          <span className="mb-2">
            <button
              className="mx-3 bg-white w-8 rounded-full "
              onClick={() => handleDecrement(flavor)}
            >
              -
            </button>
            <span className="text-xl">{count}</span>
            <button
              className="mx-3 bg-white w-8 rounded-full"
              onClick={() => handleIncrement(flavor)}
            >
              +
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Session;
