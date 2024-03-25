"use client";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Welcome from "./components/Welcome";
import Session from "./components/Session";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  databaseURL: "https://empanadas-ea8a4-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default function Home() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const handleSessionSet = (code, name) => {
    setSession(code);
    setUser(name);
  };
  return (
    <main className="flex flex-col items-center p-4 md:p-12 justify-center">
      {!session ? (
        <Welcome onSessionSet={handleSessionSet} />
      ) : (
        <Session session={session} database={database} user={user} />
      )}
    </main>
  );
}
