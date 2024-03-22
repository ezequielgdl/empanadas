"use client";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCox1E5KhH97yGGXOq2bcC41zj00GrRX5I",
  authDomain: "empanadas-ea8a4.firebaseapp.com",
  projectId: "empanadas-ea8a4",
  storageBucket: "empanadas-ea8a4.appspot.com",
  messagingSenderId: "893348663498",
  appId: "1:893348663498:web:a17d6c9d8aa399f6a32433",
  databaseURL: "https://empanadas-ea8a4-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default function Home() {
  const [empanadas, setEmpanadas] = useState({});

  useEffect(() => {
    const empanadasDB = ref(database, "sabores/");
    onValue(empanadasDB, (snapshot) => {
      const data = snapshot.val();
      setEmpanadas(data);
      console.log(empanadas);
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
      updates[`/sabores/${flavor}`] = count;
    }
    update(ref(database), updates)
      .then(() => {
        // Database update successful
      })
      .catch((error) => {
        console.error("Error updating database:", error);
      });
  };

  return (
    <main className="flex flex-col items-center p-24 justify-between">
      <div className="w-1/2 flex flex-col">
        {Object.entries(empanadas).map(([flavor, count]) => (
          <div key={flavor}>
            <label>{flavor}</label>
            <div className="border-b-2 mb-2">
              <button
                className="mx-2 bg-white w-5 rounded text-black"
                onClick={() => handleDecrement(flavor)}
              >
                -
              </button>
              <span className="text-lg">{count}</span>
              <button
                className="mx-2 bg-white w-5 rounded text-black"
                onClick={() => handleIncrement(flavor)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
