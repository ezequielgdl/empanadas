"use client";
import React, { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import UserData from "./UserData";
import Link from "next/link";
import { CopyIcon } from "@radix-ui/react-icons";

const Session = ({ database, session, user }) => {
  const [empanadas, setEmpanadas] = useState({});
  const [userEmpanadas, setUserEmpanadas] = useState({});
  const [usuarios, setUsuarios] = useState({});
  const [newFlavor, setNewFlavour] = useState("");

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
  }, [session]);

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

    if (updatedUserEmpanadas[flavor] > 0) {
      updatedUserEmpanadas[flavor] = Math.max(
        (updatedUserEmpanadas[flavor] || 0) - 1,
        0
      );

      updatedEmpanadas[flavor] = Math.max(
        (updatedEmpanadas[flavor] || 0) - 1,
        0
      );

      updateDatabase(updatedEmpanadas, updatedUserEmpanadas);
    }
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
        // Database update successful
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleFlavorChange = (event) => {
    setNewFlavour(event.target.value);
  };

  const handleAddFlavor = () => {
    if (newFlavor.trim() !== "") {
      const updatedEmpanadas = { ...empanadas, [newFlavor]: 0 };
      const updatedUserData = { ...userEmpanadas, [newFlavor]: 0 };

      updateDatabase(updatedEmpanadas, updatedUserData);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col w-full justify-center">
      <div className="flex flex-col border-2 border-foreground rounded-md py-4 lg:mx-4 lg:w-1/3 mb-4 lg:mb-0 shadow-md">
        <h1 className="w-full text-center text-3xl font-bold mb-2 text-">
          Empanadas+
        </h1>
        <div className="text-center mb-2">
          Link de acceso:{" "}
          <Link
            className="font-bold mr-1"
            href={`https://empanadas-delta.vercel.app/${session}`}
          >
            {session}
          </Link>
          <button
            className="mx-1 border-2 rounded-lg p-2 shadow-md border-white"
            onClick={() =>
              copyToClipboard(`https://empanadas-delta.vercel.app/${session}`)
            }
          >
            <CopyIcon style={{ color: "white" }} />
          </button>
        </div>
        {Object.entries(empanadas).map(([flavor, count]) => (
          <div
            className="border-b-2 border-foreground flex justify-between items-center p-2"
            key={flavor}
          >
            <label className="">{flavor.split(/(?=[A-Z])/).join(" ")}</label>
            <span className="flex items-center space-x-3">
              <button
                className="bg-white py-1 px-3 rounded-full text-foreground/10"
                onClick={() => handleDecrement(flavor)}
              >
                -
              </button>
              <span className="text-lg">{count}</span>
              <button
                className=" bg-white py-1 px-3 rounded-full text-foreground/10"
                onClick={() => handleIncrement(flavor)}
              >
                +
              </button>
            </span>
          </div>
        ))}
        <span className="flex items-center justify-center mx-4">
          <input
            type="text"
            value={newFlavor}
            onChange={handleFlavorChange}
            required
            className="mr-4"
          />
          <button
            className=" bg-white py-1 px-3 rounded-full text-foreground/10"
            onClick={handleAddFlavor}
          >
            +
          </button>
        </span>
      </div>
      <UserData users={usuarios} />
    </div>
  );
};

export default Session;
