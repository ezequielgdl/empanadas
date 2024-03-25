"use client";
import React, { useState } from "react";
import Session from "../components/Session";
import { getDatabase } from "firebase/database";
import { app } from "@/app/page";

const database = getDatabase(app);

const page = ({ params }) => {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const session = params.id;

  const handleNameChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
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
